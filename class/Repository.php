<?php

/**
 * Class Repository
 */
abstract class Repository
{
    private static $instance = null;

    /**
     * Get instance of database
     *
     * @pattern Singleton
     * @throws Exception
     * @return PDO
     */
    protected static function getDbInstance()
    {
        if (is_null(self::$instance)) {
            // Récupération des données de connection
            $ini = self::getDbConfig();

            try {
                $bdd = new PDO($ini['host'], $ini['user'], $ini['password']);

                self::$instance = $bdd;
            } catch (PDOException $e) {
                throw new Exception("Erreur lors de la connection à la base de données", 500);
            }
        }

        return self::$instance;
    }

    /**
     * Get DB config from INI file
     *
     * @throws Exception
     * @return string
     */
    protected static function getDbConfig()
    {
        $ini = parse_ini_file(__DIR__ . "/../config/database.ini");

        if (empty($ini['host']) || empty($ini['database']) || empty($ini['user']) || !isset($ini['password'])) {
            throw new Exception("Config file does not contain all required parameters");
        }

        $ini['host'] = "mysql:dbname=" . $ini['database'] . ";host=" . $ini['host'];

        return $ini;
    }
}
