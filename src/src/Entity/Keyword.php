<?php

namespace App\Entity;

use App\Repository\KeywordRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=KeywordRepository::class)
 */
class Keyword
{
	/**
	 * @ORM\Id()
	 * @ORM\GeneratedValue()
	 * @ORM\Column(type="integer")
	 */
	private $id;

	/**
	 * @ORM\Column(type="string", length=140)
	 */
	private $name;

	/**
	 * @ORM\ManyToOne(targetEntity=User::class, inversedBy="keywords")
	 * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
	 */
	private $user;

	/**
	 * @ORM\OneToMany(targetEntity=Score::class, mappedBy="keyword")
	 */
	private $scores;

	/**
	 * Keyword constructor.
	 */
	public function __construct()
	{
		$this->scores = new ArrayCollection();
	}

	/**
	 * @return int|null
	 */
	public function getId() : ?int
	{
		return $this->id;
	}

	/**
	 * @return string|null
	 */
	public function getName() : ?string
	{
		return $this->name;
	}

	/**
	 * @param string $name
	 * @return Keyword
	 */
	public function setName(string $name) : self
	{
		$this->name = $name;

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
	 * @return Keyword
	 */
	public function setUser(?User $user) : self
	{
		$this->user = $user;

		return $this;
	}

	/**
	 * @return Collection|Score[]
	 */
	public function getScores() : Collection
	{
		return $this->scores;
	}

	/**
	 * @param Score $score
	 * @return Keyword
	 */
	public function addScore(Score $score) : self
	{
		if (!$this->scores->contains($score)) {
			$this->scores[] = $score;
			$score->setKeyword($this);
		}

		return $this;
	}

	/**
	 * @param Score $score
	 * @return Keyword
	 */
	public function removeScore(Score $score) : self
	{
		if ($this->scores->contains($score)) {
			$this->scores->removeElement($score);
			// set the owning side to null (unless already changed)
			if ($score->getKeyword() === $this) {
				$score->setKeyword(null);
			}
		}

		return $this;
	}
}
