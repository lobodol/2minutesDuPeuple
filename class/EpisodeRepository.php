<?php

/**
 * Class EpisodeRepository
 */
class EpisodeRepository extends Repository
{
    /**
     * Get the list of episodes orderd by "details" and "titre"
     *
     * @return multitype:Episode
     */
    public function getAll()
    {
        $pdo = self::getDbInstance();

        $query = "SELECT id, episode_nr, titre, details FROM episodes ORDER BY titre ASC";
        $result = $pdo->query($query);

        $episodes = array();

        foreach ($result->fetchAll(PDO::FETCH_ASSOC) as $datas) {
            $episode = new Episode();
            $episode->bind($datas);

            $episodes[] = $episode;
        }

        return $episodes;
    }

    /**
     * Get datas from database matching with the fulltext research term as simple array
     *
     * @param string $fulltext : the text to find out
     * @return array
     */
    function getFulltextDatas($fulltext)
    {
        $pdo = self::getDbInstance();

        $query = 'SELECT * FROM episodes WHERE titre LIKE :fulltext OR details LIKE :fulltext OR keywords LIKE :fulltext LIMIT 10';
        $sth = $pdo->prepare($query);

        $sth->execute(array(':fulltext' => "%" . $fulltext . "%"));

        return $sth->fetchAll(PDO::FETCH_ASSOC);
    }
}