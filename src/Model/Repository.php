<?php

namespace App\Model;

/**
 * Class Repository
 */
abstract class Repository
{
    private static ?\PDO $instance = null;

    /**
     * Get instance of database
     *
     * @return \PDO
     */
    protected static function getDbInstance(): \PDO
    {
        if (is_null(self::$instance)) {
            $ini = self::getDbConfig();

            try {
                $bdd = new \PDO($ini['host'], $ini['user'], $ini['password']);

                self::$instance = $bdd;
            } catch (\PDOException $e) {
                throw new \Exception("Erreur lors de la connection à la base de données", 500);
            }
        }

        return self::$instance;
    }

    /**
     * Get DB config from INI file
     *
     * @return array
     */
    protected static function getDbConfig(): array
    {
        $ini = parse_ini_file(__DIR__."/../../config/database.ini");

        if (empty($ini['host']) || empty($ini['database']) || empty($ini['user']) || !isset($ini['password'])) {
            throw new \Exception("Config file does not contain all required parameters");
        }

        $ini['host'] = "mysql:dbname=" . $ini['database'] . ";host=" . $ini['host'];

        return $ini;
    }
}
