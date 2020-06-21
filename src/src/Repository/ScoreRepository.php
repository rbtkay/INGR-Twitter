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
	 * @param $keyword_id
	 * @throws \Doctrine\ORM\ORMException
	 * @throws \Doctrine\ORM\OptimisticLockException
	 */
	private function clearScore($keyword_id)
	{
		$scores = $this->findBy(
			["keyword" => $keyword_id],
			["date" => "asc"]
		);

		while (count($scores) > 10) {
			$this->delete($scores[0]);
			array_shift($scores);
		}
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

		$this->clearScore($keyword->getId());
		return $score;
	}
}
