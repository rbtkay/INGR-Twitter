<?php

namespace App\Entity;

use App\Repository\TweetRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TweetRepository::class)
 */
class Tweet
{
	/**
	 * @ORM\Id()
	 * @ORM\GeneratedValue()
	 * @ORM\Column(type="integer")
	 */
	private $id;

	/**
	 * @ORM\Column(type="string", length=255)
	 */
	private $twitter_id;

	/**
	 * @ORM\Column(type="string", length=255)
	 */
	private $tweet_content;

	/**
	 * @ORM\Column(type="string", length=50)
	 */
	private $twitter_name;

	/**
	 * @ORM\ManyToOne(targetEntity=User::class, inversedBy="tweets")
	 * @ORM\JoinColumn(nullable=false)
	 */
	private $user;

	/**
	 * @ORM\Column(type="datetime")
	 */
	private $tweet_date;


	/**
	 * @return int|null
	 */
	public function getId() : ?int
	{
		return $this->id;
	}

	/**
	 * @return int|null
	 */
	public function getTwitterId() : ?int
	{
		return $this->twitter_id;
	}

	/**
	 * @param int $twitter_id
	 * @return Tweet
	 */
	public function setTwitterId(int $twitter_id) : self
	{
		$this->twitter_id = $twitter_id;

		return $this;
	}

	/**
	 * @return string|null
	 */
	public function getTweetContent() : ?string
	{
		return $this->tweet_content;
	}

	/**
	 * @param string $tweet_content
	 * @return Tweet
	 */
	public function setTweetContent(string $tweet_content) : self
	{
		$this->tweet_content = $tweet_content;

		return $this;
	}

	/**
	 * @return string|null
	 */
	public function getTwitterName() : ?string
	{
		return $this->twitter_name;
	}

	/**
	 * @param string $twitter_name
	 * @return Tweet
	 */
	public function setTwitterName(string $twitter_name) : self
	{
		$this->twitter_name = $twitter_name;

		return $this;
	}

	/**
	 * @return User|null
	 */
	public function getUser() : ?User
	{
		return $this->user;
	}

	/**
	 * @param User|null $user
	 * @return Tweet
	 */
	public function setUser(?User $user) : self
	{
		$this->user = $user;

		return $this;
	}

	/**
	 * @return \DateTimeInterface|null
	 */
	public function getTweetDate() : ?\DateTimeInterface
	{
		return $this->tweet_date;
	}

	/**
	 * @param \DateTimeInterface $tweet_date
	 * @return Tweet
	 */
	public function setTweetDate(\DateTimeInterface $tweet_date) : self
	{
		$this->tweet_date = $tweet_date;

		return $this;
	}
}

