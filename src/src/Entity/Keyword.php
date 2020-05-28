<?php

namespace App\Entity;

use App\Repository\KeywordRepository;
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
	 * @return int|null
	 */
	public function getId(): ?int
    {
        return $this->id;
    }

	/**
	 * @return string|null
	 */
	public function getName(): ?string
    {
        return $this->name;
    }

	/**
	 * @param string $name
	 * @return Keyword
	 */
	public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

	/**
	 * @return User|null
	 */
	public function getUser(): ?User
    {
        return $this->user;
    }

	/**
	 * @param User|null $user
	 * @return Keyword
	 */
	public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
