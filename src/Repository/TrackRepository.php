<?php

namespace App\Repository;

use App\Entity\Track;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Track|null find($id, $lockMode = null, $lockVersion = null)
 * @method Track|null findOneBy(array $criteria, array $orderBy = null)
 * @method Track[]    findAll()
 * @method Track[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TrackRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Track::class);
    }

    /**
     * Search for episodes matching given fulltext
     *
     * @param string $fulltext
     * @param int    $limit
     * @param int    $offset
     *
     * @return mixed
     */
    public function search(string $fulltext, int $limit, int $offset)
    {
        return $this->searchQueryBase($fulltext)
            ->setMaxResults($limit)
            ->setFirstResult($offset)
            ->getQuery()
            ->getResult();
    }

    /**
     * @param string $fulltext
     *
     * @return int
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function countEpisodes(string $fulltext): int
    {
        return $this->searchQueryBase($fulltext)
            ->select('count(e.id)')
            ->getQuery()
            ->getSingleScalarResult();
    }
    /**
     * @param string $fulltext
     *
     * @return QueryBuilder
     */
    private function searchQueryBase(string $fulltext): QueryBuilder
    {
        $qb = $this->createQueryBuilder('e')
            ->leftJoin('e.category', 'c')
            ->addSelect('c');

        if (!empty($fulltext)) {
            $qb->where('e.title LIKE :fulltext')
                ->orWhere('e.keywords LIKE :fulltext')
                ->orWhere('c.name LIKE :fulltext')
                ->setParameter('fulltext', '%' . $fulltext . '%');
        }

        return $qb;
    }

    // /**
    //  * @return Track[] Returns an array of Track objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Track
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
