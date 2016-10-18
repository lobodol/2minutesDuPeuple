<?php

/**
 * Class Episode
 */
class Episode
{
    /**
     * @var int
     */
    private $id;

    /**
     * @var int
     */
    private $episode_nr;

    /**
     * @var string
     */
    private $titre;

    /**
     * @var null
     */
    private $details = null;

    /**
     * @var null
     */
    private $keywords = null;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get episode_nr
     *
     * @return string
     */
    public function getEpisodeNr()
    {
        return $this->episode_nr;
    }

    /**
     * Return episode_nr 4 digits formated (prefixed with "0")
     *
     * @return string
     */
    public function getFullEpisodeNr()
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
    public function getTitre()
    {
        return $this->titre;
    }

    /**
     * Get details
     *
     * @return mixed
     */
    public function getDetails()
    {
        return $this->details;
    }

    /**
     * Get keywords
     *
     * @return mixed
     */
    public function getKeywords()
    {
        return $this->keywords;
    }

    /**
     * Returns path to MP3 file
     *
     * @return string
     */
    public function getMp3()
    {
        return "web/mp3/" . $this->getFullEpisodeNr() . ".mp3";
    }

    /**
     * Binds datas to this object
     *
     * @param array $datas : array of datas
     * @throws Exception
     * @return Episode
     */
    public function bind($datas)
    {
        if (empty($datas['id'])) {
            throw new Exception("ID can't be NULL");
        } else {
            $this->id = $datas['id'];
        }

        if (empty($datas['episode_nr'])) {
            throw new Exception("episode_nr can't be NULL");
        } else {
            $this->episode_nr = $datas['episode_nr'];
        }

        if (empty($datas['titre'])) {
            throw new Exception("titre can't be NULL");
        } else {
            $this->titre = utf8_encode($datas['titre']);
        }

        if (!empty($datas['details'])) {
            $this->details = utf8_encode($datas['details']);
        }

        if (!empty($datas['keywords'])) {
            $this->keywords = $datas['keywords'];
        }

        return $this;
    }
}
