<?php

namespace App\Model;

use Symfony\Component\Dotenv\Dotenv;

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
            self::loadEnvVariables();

                $bdd = new \PDO($_ENV['DATABASE_DSN']);

                self::$instance = $bdd;
            try {
            } catch (\PDOException $e) {
                throw new \Exception("Erreur lors de la connection à la base de données", 500);
            }
        }

        return self::$instance;
    }

    protected static function loadEnvVariables(): void
    {
        $dotenv = new Dotenv();
        $dotenv->loadEnv(__DIR__.'/../../.env');
    }
}
