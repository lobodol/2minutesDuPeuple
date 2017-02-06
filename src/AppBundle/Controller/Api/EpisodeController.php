<?php

namespace AppBundle\Controller\Api;

use AppBundle\Entity\Episode;
use AppBundle\Form\EpisodeType;
use FOS\RestBundle\Controller\FOSRestController;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class EpisodeController.
 * @package AppBundle\Controller\Api
 */
class EpisodeController extends FOSRestController
{
    /**
     * Get all episode resources.
     *
     * @Rest\View()
     * @ApiDoc(
     *     resource=true,
     *     description="Get list of all episodes",
     *     filters={
     *         {"name"="sort", "dataType"="string", "values"={"title", "category"}},
     *         {"name"="order", "dataType"="string", "values"={"ASC", "DESC"}},
     *     }
     * )
     * @return array
     */
    public function getEpisodesAction()
    {
        /** @var Episode[] $episodes */
        $episodes = $this->getDoctrine()
            ->getRepository('AppBundle:Episode')
            ->findAll();

        return $episodes;
    }

    /**
     * Get an episode resource.
     *
     * @ApiDoc(description="Get a single episode")
     * @Rest\View()
     *
     * @param Episode $episode : the episode object.
     * @return Episode
     */
    public function getEpisodeAction(Episode $episode)
    {
        return $episode;
    }

    /**
     * Create a new episode resource.
     *
     * @ApiDoc(description="Create a new episode")
     * @Rest\View(statusCode=Response::HTTP_CREATED)
     *
     * @param Request $request : the current request object.
     * @return mixed
     */
    public function postEpisodeAction(Request $request)
    {
        $episode = new Episode();
        $form = $this->createForm(EpisodeType::class, $episode);
        $form->submit($request->request->all());

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($episode);
            $em->flush();

            return $episode;
        }

        return $form;
    }

    /**
     * Delete an episode resource.
     *
     * @ApiDoc(description="Delete an episode")
     * @Rest\View(statusCode=Response::HTTP_NO_CONTENT)
     * @param int $episode : the ID the episode to delete.
     */
    public function deleteEpisodeAction($episode)
    {
        $em = $this->getDoctrine()->getManager();

        $episode = $em->getRepository('AppBundle:Episode')->find($episode);

        if ($episode instanceof Episode) {
            $em->remove($episode);
            $em->flush();
        }
    }

    /**
     * Update fully an episode request.
     *
     * @ApiDoc()
     * @Rest\View()
     * @Rest\Put("episodes/{episode}")
     *
     * @param Episode $episode : the episode object.
     * @param Request $request : the current request object.
     * @return mixed
     */
    public function putEpisodeAction(Episode $episode, Request $request)
    {
        return $this->updateEpisode($episode, $request);
    }

    /**
     * Update partially an episode resource.
     *
     * @ApiDoc()
     * @Rest\View()
     * @Rest\Patch("episodes/{episode}")
     *
     * @param Episode $episode : the episode object.
     * @param Request $request : the current request object.
     * @return mixed
     */
    public function patchEpisodeAction(Episode $episode, Request $request)
    {
        return $this->updateEpisode($episode, $request, false);
    }

    /**
     * Update an episode object, partially or fully.
     *
     * @param Episode $episode      : the episode object to update.
     * @param Request $request      : the current rquest object.
     * @param bool    $clearMissing : make a partial update if TRUE, full update otherwise.
     * @return Episode|Form
     */
    protected function updateEpisode(Episode $episode, Request $request, $clearMissing = true)
    {
        $form = $this->createForm(EpisodeType::class, $episode);
        $form->submit($request->request->all(), $clearMissing);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->merge($episode);
            $em->flush();

            return $episode;
        }

        return $form;
    }
}