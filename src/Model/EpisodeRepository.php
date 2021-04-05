<?php

namespace App\Model;

/**
 * Class EpisodeRepository
 */
class EpisodeRepository extends Repository
{
    /**
     * Get the list of episodes ordered by "details" and "titre"
     *
     * @return array
     */
    public function getAll(): array
    {
        $pdo = self::getDbInstance();

        $query = "SELECT id, episode_nr, titre, details FROM episodes ORDER BY titre ASC";
        $result = $pdo->query($query);

        $episodes = array();

        if (false !== $result) {
            foreach ($result->fetchAll(\PDO::FETCH_ASSOC) as $datas) {
                $episode = new Episode();
                $episode->bind($datas);

                $episodes[] = $episode;
            }
        }

        return $episodes;
    }

    /**
     * Get datas from database matching with the fulltext research term as simple array
     *
     * @param string $fulltext : the text to find out
     * @return array
     */
    public function getFulltextDatas(string $fulltext): array
    {
        $pdo = self::getDbInstance();

        $query = 'SELECT * FROM episodes WHERE titre LIKE :fulltext OR details LIKE :fulltext OR keywords LIKE :fulltext LIMIT 10';
        $sth = $pdo->prepare($query);

        $sth->execute(array(':fulltext' => "%" . $fulltext . "%"));

        return $sth->fetchAll(\PDO::FETCH_ASSOC);
    }
}
