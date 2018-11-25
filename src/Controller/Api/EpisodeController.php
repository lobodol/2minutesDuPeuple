<?php

namespace App\Controller\Api;

use App\Entity\Episode;
use App\Repository\EpisodeRepository;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\ConstraintViolationList;

/**
 * @Route("/episode")
 */
class EpisodeController extends FOSRestController
{
    /**
     * @Rest\Get("", name="app.api.episode.search")
     * @Rest\QueryParam(name="fulltext", default="")
     * @Rest\QueryParam(name="limit", default="15", requirements="[0-9]+")
     * @Rest\QueryParam(name="offset", default="0", requirements="[0-9]+")
     * @Rest\View()
     *
     * @return array
     */
    public function searchEpisodes(EpisodeRepository $repository, string $fulltext = '', int $limit = 15, int $offset = 0)
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
     * @Rest\Get("/{episode}", name="app.api.episode.get")
     * @Rest\View()
     *
     * @param Episode $episode
     *
     * @return Episode
     */
    public function getEpisode(Episode $episode)
    {
        return $episode;
    }

    /**
     * @Rest\Patch("/{episode}", name="app.api.episode.patch")
     * @Rest\View()
     *
     * @ParamConverter("episode", converter="fos_rest.request_body")
     */
    public function patchEpisode(Episode $episode, ConstraintViolationList $violations, EntityManagerInterface $manager)
    {
        /*if ($violations->count()) {
            return $this->view($violations, Response::HTTP_BAD_REQUEST);
        }

        $manager->persist($episode);*/

        return $episode;
    }
}
