<?php

namespace App\Entity;

use App\Repository\ScoreRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ScoreRepository::class)
 */
class Score
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
	private $number;

	/**
	 * @ORM\Column(type="datetime")
	 */
	private $date;

	/**
	 * @ORM\ManyToOne(targetEntity=Keyword::class, inversedBy="scores")
	 * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
	 */
	private $keyword;


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
	public function getNumber() : ?int
	{
		return $this->number;
	}

	/**
	 * @param int $number
	 * @return Score
	 */
	public function setNumber(int $number) : self
	{
		$this->number = $number;

		return $this;
	}

	/**
	 * @return \DateTimeInterface|null
	 */
	public function getDate() : ?\DateTimeInterface
	{
		return $this->date;
	}

	/**
	 * @param \DateTimeInterface $date
	 * @return Score
	 */
	public function setDate(\DateTimeInterface $date) : self
	{
		$this->date = $date;

		return $this;
	}

	/**
	 * @return Keyword|null
	 */
	public function getKeyword() : ?Keyword
	{
		return $this->keyword;
	}

	/**
	 * @param Keyword|null $keyword
	 * @return Score
	 */
	public function setKeyword(?Keyword $keyword) : self
	{
		$this->keyword = $keyword;

		return $this;
	}
}
