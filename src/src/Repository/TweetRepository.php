<?php

namespace App\Repository;

use App\Entity\Tweet;
use App\Entity\User;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

use \DateTime;
use Twig\Node\Expression\Test\ConstantTest;

/**
 * @method Tweet|null find($id, $lockMode = null, $lockVersion = null)
 * @method Tweet|null findOneBy(array $criteria, array $orderBy = null)
 * @method Tweet[]    findAll()
 * @method Tweet[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TweetRepository extends ServiceEntityRepository
{
	/**
	 * TweetRepository constructor.
	 * @param ManagerRegistry $registry
	 */
	public function __construct(ManagerRegistry $registry)
	{
		parent::__construct($registry, Tweet::class);
	}

	/**
	 * @param int $twitter_id
	 * @param string $content
	 * @param string $tweet_date
	 * @param string $twitter_name
	 * @param User $user
	 * @throws \Doctrine\ORM\ORMException
	 * @throws \Doctrine\ORM\OptimisticLockException
	 */
	public function insert(int $twitter_id, string $content, string $tweet_date, string $twitter_name, User $user)
	{
		$tweet = new Tweet();

		$tweet_date = DateTime::createFromFormat('D M j H:i:s P Y', $tweet_date);
		$tweet->setTwitterId((integer) $twitter_id);
		$tweet->setTweetContent($content);
		$tweet->setTwitterName($twitter_name);
		$tweet->setTweetDate($tweet_date);
		$tweet->setUser($user);
		$this->_em->persist($tweet);
		$this->_em->flush();
	}

	/**
	 * @param Tweet $tweet
	 * @throws \Doctrine\ORM\ORMException
	 * @throws \Doctrine\ORM\OptimisticLockException
	 */
	public function delete(Tweet $tweet)
	{
		$this->_em->remove($tweet);
		$this->_em->flush();
	}
}
