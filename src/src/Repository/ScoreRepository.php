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
	 * @param $id
	 * @return int
	 */
	private function countScores($id)
	{
		$scores = $this->findBy(
			["keyword" => $id]
		);
		return count($scores);
	}

	/**
	 * @param Score $score
	 * @throws \Doctrine\ORM\ORMException
	 * @throws \Doctrine\ORM\OptimisticLockException
	 */
	private function delete(Score $score)
	{
		$this->_em->remove($score);
		$this->_em->flush();
	}

	/**
	 * @param $id
	 * @throws \Doctrine\ORM\ORMException
	 * @throws \Doctrine\ORM\OptimisticLockException
	 */
	private function deleteScore($id)
	{
		$score = $this->findBy(
			["keyword" => $id],
			["date" => "asc"],
			1
		);

		$this->delete($score[0]);
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
		$score->setDate(new \Datetime($data['date']));
		$score->setKeyword($keyword);
		$this->_em->persist($score);
		$this->_em->flush();

		if ($this->countScores($keyword->getId()) > 10) {
			$this->deleteScore($keyword->getId());
		}
		return $score;
	}
}
