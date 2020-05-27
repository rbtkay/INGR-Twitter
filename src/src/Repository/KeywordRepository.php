<?php

namespace App\Repository;

use App\Entity\Keyword;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Keyword|null find($id, $lockMode = null, $lockVersion = null)
 * @method Keyword|null findOneBy(array $criteria, array $orderBy = null)
 * @method Keyword[]    findAll()
 * @method Keyword[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class KeywordRepository extends ServiceEntityRepository
{
	/**
	 * KeywordRepository constructor.
	 * @param ManagerRegistry $registry
	 */
	public function __construct(ManagerRegistry $registry)
	{
		parent::__construct($registry, Keyword::class);
	}

	/**
	 * @param string $name
	 * @throws \Doctrine\ORM\ORMException
	 * @throws \Doctrine\ORM\OptimisticLockException
	 */
	public function insert(string $name, User $user)
	{
		$keyword = new Keyword();
		$keyword->setName($name);
		$keyword->setUser($user);
		$this->_em->persist($keyword);
		$this->_em->flush();
	}

	/**
	 * @param Keyword $keyword
	 * @param array $data
	 * @return array
	 * @throws \Doctrine\ORM\ORMException
	 * @throws \Doctrine\ORM\OptimisticLockException
	 */
	public function update(Keyword $keyword, array $data)
	{
		$updated_rows = [];
		if (!empty($data['name'])) {
			$keyword->setName($data['name']);
			$updated_rows[] = 'username';
		}

		$this->_em->persist($keyword);
		$this->_em->flush();
		return $updated_rows;
	}

	/**
	 * @param Keyword $keyword
	 * @throws \Doctrine\ORM\ORMException
	 * @throws \Doctrine\ORM\OptimisticLockException
	 */
	public function delete(Keyword $keyword)
	{
		$this->_em->remove($keyword);
		$this->_em->flush();
	}
}
