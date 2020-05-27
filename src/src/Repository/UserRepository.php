<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
	private $passwordEncoder;

	/**
	 * UserRepository constructor.
	 * @param ManagerRegistry $registry
	 * @param UserPasswordEncoderInterface $passwordEncoder
	 */
	public function __construct(ManagerRegistry $registry, UserPasswordEncoderInterface $passwordEncoder)
	{
		$this->passwordEncoder = $passwordEncoder;
		parent::__construct($registry, User::class);
	}

	/**
	 * Used to upgrade (rehash) the user's password automatically over time.
	 * Used by symfony
	 * @param UserInterface $user
	 * @param string $newEncodedPassword
	 * @throws \Doctrine\ORM\ORMException
	 * @throws \Doctrine\ORM\OptimisticLockException
	 */
	public function upgradePassword(UserInterface $user, string $newEncodedPassword) : void
	{
		if (!$user instanceof User) {
			throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', \get_class($user)));
		}

		$user->setPassword($newEncodedPassword);
		$this->_em->persist($user);
		$this->_em->flush();
	}

	/**
	 * @param string $username
	 * @param string $password
	 * @param string $email
	 * @throws \Doctrine\ORM\ORMException
	 * @throws \Doctrine\ORM\OptimisticLockException
	 */
	public function insert(string $username, string $password, string $email)
	{
		$user = new User();
		$user->setUsername($username);
		$user->setEmail($email);
		$user->setPassword($this->passwordEncoder->encodePassword($user, $password));
		$user->setRoles($user->getRoles());
		$this->_em->persist($user);
		$this->_em->flush();
	}

	/**
	 * @param User $user
	 * @param array $data
	 * @return array
	 * @throws \Doctrine\ORM\ORMException
	 * @throws \Doctrine\ORM\OptimisticLockException
	 */
	public function update(User $user, array $data)
	{
		$updated_rows = [];
		if (!empty($data['username'])) {
			$user->setUsername($data['username']);
			$updated_rows[] = 'username';
		}
		if (!empty($data['email'])) {
			$user->setEmail($data['email']);
			$updated_rows[] = 'email';
		}
		if (!empty($data['password'])) {
			$user->setPassword($this->passwordEncoder->encodePassword($user, $data['password']));
			$updated_rows[] = 'password';
		}

		$this->_em->persist($user);
		$this->_em->flush();
		return $updated_rows;
	}

	/**
	 * @param User $user
	 * @throws \Doctrine\ORM\ORMException
	 * @throws \Doctrine\ORM\OptimisticLockException
	 */
	public function delete(User $user)
	{
		$this->_em->remove($user);
		$this->_em->flush();
	}
}
