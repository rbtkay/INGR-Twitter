<?php

namespace App\Repository;

use App\Entity\Keyword;
use App\Entity\Score;
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

	public function selectByUserOrderByScore(User $user)
	{
		return $this->createQueryBuilder('k')
			->innerJoin('k.scores', 's')
			->where('k.user = :user')
			->setParameter('user', $user)
			->orderBy('s.date', 'ASC')
			->getQuery()
			->getResult();
	}

	/**
	 * @param string $name
	 * @return Keyword
	 * @throws \Doctrine\ORM\ORMException
	 * @throws \Doctrine\ORM\OptimisticLockException
	 */
	public function insert(User $user, string $name)
	{
		$keyword = new Keyword();
		$keyword->setName($name);
		$keyword->setUser($user);

		// TODO : request twitter API for getting scores
		//		$score = new Score();
		//		$score->setNumber();
		//		$score->setDate(new \DateTime());
		//		$keyword->addScore($score);

		$this->_em->persist($keyword);
		$this->_em->flush();
		return $keyword;
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
			$updated_rows['name'] = $data['name'];
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
