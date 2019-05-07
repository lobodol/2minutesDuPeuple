<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TrackRepository")
 * @Serializer\ExclusionPolicy("ALL")
 */
class Track
{
    /**
     * @Serializer\Expose()
     *
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(type="guid")
     */
    private $id;

    /**
     * @Serializer\Expose()
     *
     * @ORM\Column(type="string", length=255)
     *
     * @Assert\NotBlank()
     * @Assert\Length(max="255")
     */
    private $title;

    /**
     * @Serializer\Expose()
     *
     * @var Category
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Category")
     *
     * @Assert\Valid()
     */
    private $category;

    /**
     * @Serializer\Expose()
     *
     * @ORM\Column(type="text", nullable=true)
     * @Assert\Type("string")
     */
    private $keywords;

    /**
     * @ORM\Column(type="string", length=255)
     *
     * @Assert\NotBlank()
     * @Assert\Length(max="255")
     */
    private $file;

    /**
     * @return string|null
     */
    public function getId(): ?string
    {
        return $this->id;
    }

    /**
     * @return null|string
     */
    public function getTitle(): ?string
    {
        return $this->title;
    }

    /**
     * @param string $title
     *
     * @return Track
     */
    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    /**
     * @return null|string
     */
    public function getKeywords(): ?string
    {
        return $this->keywords;
    }

    /**
     * @param null|string $keywords
     *
     * @return Track
     */
    public function setKeywords(?string $keywords): self
    {
        $this->keywords = $keywords;

        return $this;
    }

    /**
     * @return null|string
     */
    public function getFile(): ?string
    {
        return $this->file;
    }

    /**
     * @param string $file
     *
     * @return Track
     */
    public function setFile(string $file): self
    {
        $this->file = $file;

        return $this;
    }

    /**
     * @return Category|null
     */
    public function getCategory(): ?Category
    {
        return $this->category;
    }

    /**
     * @param Category|null $category
     *
     * @return Track
     */
    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }
}
