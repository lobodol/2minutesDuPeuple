<?php

namespace App\Model;

/**
 * Class Episode
 */
class Episode
{
    /**
     * @var int
     */
    private int $id;

    /**
     * @var int
     */
    private int $episode_nr;

    /**
     * @var string
     */
    private string $titre;

    /**
     * @var string|null
     */
    private ?string $details = null;

    /**
     * @var string|null
     */
    private ?string $keywords = null;

    /**
     * Get id
     *
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * Get episode_nr
     *
     * @return int
     */
    public function getEpisodeNr(): int
    {
        return $this->episode_nr;
    }

    /**
     * Return episode_nr 4 digits formatted (prefixed with "0")
     *
     * @return string
     */
    public function getFullEpisodeNr(): string
    {
        $nr = $this->getEpisodeNr();

        while (strlen($nr) < 4) {
            $nr = "0" . $nr;
        }

        return $nr;
    }

    /**
     * Get titre
     *
     * @return string
     */
    public function getTitre(): string
    {
        return $this->titre;
    }

    /**
     * Get details
     *
     * @return string|null
     */
    public function getDetails(): ?string
    {
        return $this->details;
    }

    /**
     * Get keywords
     *
     * @return string|null
     */
    public function getKeywords(): ?string
    {
        return $this->keywords;
    }

    /**
     * Returns path to MP3 file
     *
     * @return string
     */
    public function getMp3(): string
    {
        return "/mp3/" . $this->getFullEpisodeNr() . ".mp3";
    }

    /**
     * Binds data to this object
     *
     * @param array $data : array of data
     *
     * @return Episode
     */
    public function bind(array $data): self
    {
        if (empty($data['id'])) {
            throw new \Exception("ID can't be NULL");
        } else {
            $this->id = $data['id'];
        }

        if (empty($data['episode_nr'])) {
            throw new \Exception("episode_nr can't be NULL");
        } else {
            $this->episode_nr = $data['episode_nr'];
        }

        if (empty($data['titre'])) {
            throw new \Exception("titre can't be NULL");
        } else {
            $this->titre = $data['titre'];
        }

        if (!empty($data['details'])) {
            $this->details = $data['details'];
        }

        if (!empty($data['keywords'])) {
            $this->keywords = $data['keywords'];
        }

        return $this;
    }
}
