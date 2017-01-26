<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Episode
 *
 * @ORM\Table(name="episode", indexes={@ORM\Index(name="keywords", columns={"keywords"})})
 * @ORM\Entity(repositoryClass="AppBundle\Repository\EpisodeRepository")
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
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Category")
     */
    private $category;

    /**
     * Number of the episode.
     *
     * @var int
     *
     * @ORM\Column(name="number", type="integer")
     */
    private $number;

    /**
     * Title of the episode.
     *
     * @var string
     *
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
     * @return int
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

