<?php

namespace App\Controller;

use App\Entity\Episode;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Entity;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    /**
     * @Route("/", name="app.home", methods={"GET"})
     *
     * @Entity("episodes", expr="repository.findAll()", class="App\Entity\Episode")
     *
     * @param Episode[] $episodes
     *
     * @return Response
     */
    public function index(array $episodes = [])
    {
        return $this->render('app/index.html.twig', [
            'episodes' => $episodes,
            'current'  => isset($episodes[0]) ? $episodes[0]->getId() : null,
        ]);
    }

    /**
     * @Route("/{episode}", name="app.play_episode", requirements={"episode" = "\d+"}, methods={"GET"})
     *
     * @param array $episodes
     * @param int   $episode
     *
     * @return Response
     */
    public function playEpisode(array $episodes, $episode)
    {
        return $this->render('app/index.html.twig', [
            'episodes' => $episodes,
            'current'  => $episode
        ]);

    }
}
