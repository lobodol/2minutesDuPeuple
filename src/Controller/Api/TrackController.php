<?php

namespace App\Controller\Api;

use App\Entity\Track;
use App\Repository\TrackRepository;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/track")
 */
class TrackController extends FOSRestController
{
    /**
     * @Rest\Get("", name="app.api.track.search")
     * @Rest\QueryParam(name="fulltext", default="")
     * @Rest\QueryParam(name="limit", default="15", requirements="[0-9]+")
     * @Rest\QueryParam(name="offset", default="0", requirements="[0-9]+")
     * @Rest\View()
     *
     * @return array
     */
    public function searchEpisodes(TrackRepository $repository, string $fulltext = '', int $limit = 15, int $offset = 0)
    {
        $episodes   = $repository->search(trim($fulltext), $limit, $offset);
        $total      = $repository->countEpisodes($fulltext);

        return [
            'total'    => $total,
            'limit'    => $limit,
            'offset'   => $offset,
            'fulltext' => trim($fulltext),
            'episodes' => $episodes,
        ];
    }

    /**
     * @Rest\Get("/{track}", name="app.api.episode.get")
     * @Rest\View()
     * @param Track $track
     *
     * @return Track
     */
    public function getEpisode(Track $track): Track
    {
        return $track;
    }
}
