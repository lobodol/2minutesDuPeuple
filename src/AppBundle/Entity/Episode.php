<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * Episode
 *
 * @ORM\Table(name="episode", uniqueConstraints={@ORM\UniqueConstraint(name="unique_episode", columns={"category_id", "title", "number"})})
 * @ORM\Entity(repositoryClass="AppBundle\Repository\EpisodeRepository")
 * @UniqueEntity(
 *     fields={"category", "title", "number"},
 *     errorPath="title",
 *     message="An episode with same parameters already exists"
 * )
 */
class Episode
{
    /**
     * Primary key.
     *
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * Category to which it belongs.
     *
     * @Assert\Valid()
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Category")
     */
    private $category;

    /**
     * Number of the episode.
     *
     * @var int
     *
     * @Assert\NotNull()
     * @Assert\Range(
     *     min = 1,
     * )
     * @ORM\Column(name="number", type="integer")
     */
    private $number;

    /**
     * Title of the episode.
     *
     * @var string
     *
     * @Assert\NotBlank()
     * @ORM\Column(name="title", type="string", length=255)
     */
    private $title;

    /**
     * Key words.
     *
     * @var string
     *
     * @ORM\Column(name="keywords", type="string", nullable=true, length=1024)
     */
    private $keywords;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set category
     *
     * @param integer $category
     *
     * @return Episode
     */
    public function setCategory($category)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get category
     *
     * @return Category
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set number
     *
     * @param integer $number
     *
     * @return Episode
     */
    public function setNumber($number)
    {
        $this->number = $number;

        return $this;
    }

    /**
     * Get number
     *
     * @return int
     */
    public function getNumber()
    {
        return $this->number;
    }

    /**
     * Set title
     *
     * @param string $title
     *
     * @return Episode
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set keywords
     *
     * @param string $keywords
     *
     * @return Episode
     */
    public function setKeywords($keywords)
    {
        $this->keywords = $keywords;

        return $this;
    }

    /**
     * Get keywords
     *
     * @return string
     */
    public function getKeywords()
    {
        return $this->keywords;
    }
}
