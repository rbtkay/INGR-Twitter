<?php

namespace App\Repository;

use App\Entity\Keyword;
use App\Entity\Score;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Score|null find($id, $lockMode = null, $lockVersion = null)
 * @method Score|null findOneBy(array $criteria, array $orderBy = null)
 * @method Score[]    findAll()
 * @method Score[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ScoreRepository extends ServiceEntityRepository
{
	/**
	 * ScoreRepository constructor.
	 * @param ManagerRegistry $registry
	 */
	public function __construct(ManagerRegistry $registry)
	{
		parent::__construct($registry, Score::class);
	}

	/**
	 * @param Keyword $keyword
	 * @param array $data
	 * @return Score
	 * @throws \Doctrine\ORM\ORMException
	 * @throws \Doctrine\ORM\OptimisticLockException
	 */
	public function insertScore(Keyword $keyword, array $data)
	{
		$score = new Score();
		$score->setNumber($data['number']);
		$score->setKeyword($keyword);
		$this->_em->persist($score);
		$this->_em->flush();
		return $score;
	}
}
