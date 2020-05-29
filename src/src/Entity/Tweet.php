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
     * @ORM\Column(type="integer")
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

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTwitterId(): ?int
    {
        return $this->twitter_id;
    }

    public function setTwitterId(int $twitter_id): self
    {
        $this->twitter_id = $twitter_id;

        return $this;
    }

    public function getTweetContent(): ?string
    {
        return $this->tweet_content;
    }

    public function setTweetContent(string $tweet_content): self
    {
        $this->tweet_content = $tweet_content;

        return $this;
    }

    public function getTwitterName(): ?string
    {
        return $this->twitter_name;
    }

    public function setTwitterName(string $twitter_name): self
    {
        $this->twitter_name = $twitter_name;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}