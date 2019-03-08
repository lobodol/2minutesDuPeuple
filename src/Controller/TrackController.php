<?php

namespace App\Controller;

use App\Repository\TrackRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class TrackController extends AbstractController
{
    /**
     * @Route("/track/search", name="track.search", methods={"POST"})
     *
     * @param Request         $request
     * @param TrackRepository $repository
     *
     * @return JsonResponse
     */
    public function search(Request $request, TrackRepository $repository): JsonResponse
    {
        $fulltext = $request->get('fulltext', '');
        $tracks   = $repository->search($fulltext, 10, 0);

        return new JsonResponse($tracks);
    }
}
