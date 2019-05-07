<?php

namespace App\Controller;

use App\Repository\TrackRepository;
use JMS\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TrackController extends AbstractController
{
    /**
     * @Route("/track/search", name="track.search", methods={"POST"})
     *
     * @param Request             $request
     * @param TrackRepository     $repository
     * @param SerializerInterface $serializer
     *
     * @return JsonResponse
     */
    public function search(Request $request, TrackRepository $repository, SerializerInterface $serializer): JsonResponse
    {
        $fulltext = $request->get('fulltext', '');
        $tracks   = $repository->search($fulltext, 10, 0);

        return new JsonResponse($serializer->serialize($tracks, 'json'), Response::HTTP_OK, [], true);
    }
}
