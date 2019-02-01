<?php

namespace App\Controller;

use App\Entity\Track;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Entity;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    /**
     * @Route("/", name="app.home", methods={"GET"})
     * @Entity("tracks", expr="repository.findAll()", class="App\Entity\Track")
     * @param Track[] $tracks
     *
     * @return Response
     */
    public function index(array $tracks = [])
    {
        return $this->render('app/index.html.twig', [
            'tracks'  => $tracks,
            'current' => isset($tracks[0]) ? $tracks[0]->getId() : null,
        ]);
    }
}
