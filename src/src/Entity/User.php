<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
class User implements UserInterface
{
	/**
	 * @ORM\Id()
	 * @ORM\GeneratedValue()
	 * @ORM\Column(type="integer")
	 */
	private $id;

	/**
	 * @ORM\Column(type="string", length=180, unique=true)
	 */
	private $username;

	/**
	 * @ORM\Column(type="json")
	 */
	private $roles = [];

	/**
	 * @var string The hashed password
	 * @ORM\Column(type="string")
	 */
	private $password;

	/**
	 * @ORM\Column(type="string", length=180, unique=true)
	 */
	private $email;

	/**
	 * @ORM\Column(type="string", length=25, nullable=true)
	 */
	private $twitter_name;

	/**
	 * @ORM\OneToMany(targetEntity=Keyword::class, mappedBy="user")
	 */
	private $keywords;

	/**
	 * User constructor.
	 */
	public function __construct()
	{
		$this->keywords = new ArrayCollection();
	}

	/**
	 * @return int|null
	 */
	public function getId() : ?int
	{
		return $this->id;
	}

	/**
	 * A visual identifier that represents this user.
	 *
	 * @see UserInterface
	 */
	public function getUsername() : string
	{
		return (string) $this->username;
	}

	/**
	 * @param string $username
	 * @return User
	 */
	public function setUsername(string $username) : self
	{
		$this->username = $username;

		return $this;
	}

	/**
	 * @see UserInterface
	 */
	public function getRoles() : array
	{
		$roles = $this->roles;
		// guarantee every user at least has ROLE_USER
		$roles[] = 'ROLE_USER';

		return array_unique($roles);
	}

	/**
	 * @param array $roles
	 * @return User
	 */
	public function setRoles(array $roles) : self
	{
		$this->roles = $roles;

		return $this;
	}

	/**
	 * @see UserInterface
	 */
	public function getPassword() : string
	{
		return (string) $this->password;
	}

	/**
	 * @param string $password
	 * @return User
	 */
	public function setPassword(string $password) : self
	{
		$this->password = $password;

		return $this;
	}

	/**
	 * @see UserInterface
	 */
	public function getSalt()
	{
		// not needed when using the "bcrypt" algorithm in security.yaml
	}

	/**
	 * @see UserInterface
	 */
	public function eraseCredentials()
	{
		// If you store any temporary, sensitive data on the user, clear it here
		// $this->plainPassword = null;
	}

	/**
	 * @return string|null
	 */
	public function getEmail() : ?string
	{
		return $this->email;
	}

	/**
	 * @param string $email
	 * @return User
	 */
	public function setEmail(string $email) : self
	{
		$this->email = $email;

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
	 * @return User
	 */
	public function setTwitterName(?string $twitter_name) : self
	{
		$this->twitter_name = $twitter_name;

		return $this;
	}

	/**
	 * @return Collection|Keyword[]
	 */
	public function getKeywords() : Collection
	{
		return $this->keywords;
	}

	/**
	 * @param Keyword $keyword
	 * @return User
	 */
	public function addKeyword(Keyword $keyword) : self
	{
		if (!$this->keywords->contains($keyword)) {
			$this->keywords[] = $keyword;
			$keyword->setUser($this);
		}

		return $this;
	}

	/**
	 * @param Keyword $keyword
	 * @return User
	 */
	public function removeKeyword(Keyword $keyword) : self
	{
		if ($this->keywords->contains($keyword)) {
			$this->keywords->removeElement($keyword);
			// set the owning side to null (unless already changed)
			if ($keyword->getUser() === $this) {
				$keyword->setUser(null);
			}
		}

		return $this;
	}
}
