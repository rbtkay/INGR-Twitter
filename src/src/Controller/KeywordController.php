<?php

namespace App\Controller;

use App\Repository\KeywordRepository;
use JsonException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class KeywordController extends AbstractController
{
    /**
     * @Route("/api/keywords", name="keyword", methods={"GET"})
     */
    public function index()
    {
        return $this->render('keyword/index.html.twig', [
            'controller_name' => 'KeywordController',
        ]);
    }

	/**
	 * @Route("/api/keywords", name="addKeyword", methods={"POST"})
	 * @param Request $request
	 * @param KeywordRepository $k_repo
	 * @return JsonResponse
	 * @throws \Doctrine\ORM\ORMException
	 * @throws \Doctrine\ORM\OptimisticLockException
	 */
	public function addKeyword(Request $request, KeywordRepository $k_repo)
	{
		try {
			$keyword = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
		} catch (JsonException $e) {
			return new JsonResponse(
				['error' => $e->getCode(), 'message' => $e->getMessage()],
				Response::HTTP_BAD_REQUEST
			);
		}

		if(!empty($keyword['name'])) {
			$exists = $k_repo->findOneBy(['name' => $keyword['name']]);
			if (!empty($exists)) {
				return new JsonResponse(
					['message' => 'Keyword for this name is already used'],
					Response::HTTP_INTERNAL_SERVER_ERROR
				);
			}
			$k_repo->insert($keyword['name'], $this->getUser());

			return new JsonResponse(['message' => 'Keyword registered'], Response::HTTP_CREATED);
		}
		return new JsonResponse(['error' => 'Keyword incomplete'], Response::HTTP_BAD_REQUEST);
	}
}
