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
	 * @Route("/api/keywords", name="create_keyword", methods={"POST"})
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

		if (!empty($keyword['name'])) {
			$exists = $k_repo->findOneBy(
				[
					'name' => $keyword['name'],
					'user' => $this->getUser()
				]
			);
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

	/**
	 * @Route("/api/keywords", name="keywords", methods={"GET"})
	 * @param Request $request
	 * @param KeywordRepository $k_repo
	 * @return JsonResponse
	 */
	public function getKeywords(Request $request, KeywordRepository $k_repo)
	{
		$user     = $this->getUser();
		$keywords = $k_repo->findBy(["user" => $user]);
		$return   = [];
		foreach ($keywords as $keyword) {
			$return[] = [
				'id'      => $keyword->getId(),
				'name'    => $keyword->getName(),
			];
		}

		return new JsonResponse($return, Response::HTTP_OK);
	}

	/**
	 * @Route("/api/keywords/{id}", name="keyword", methods={"GET"})
	 * @param $id
	 * @param Request $request
	 * @param KeywordRepository $k_repo
	 * @return JsonResponse
	 */
	public function getKeywordById($id, Request $request, KeywordRepository $k_repo)
	{
		$user    = $this->getUser();
		$keyword = $k_repo->findOneBy(
			[
				"user" => $user,
				"id"   => $id
			]
		);

		if (empty($keyword)) {
			return new JsonResponse(['message' => 'Wrong id'], Response::HTTP_NOT_FOUND);
		}

		$return = [
			'id'      => $keyword->getId(),
			'name'    => $keyword->getName(),
		];

		return new JsonResponse($return, Response::HTTP_OK);
	}

	/**
	 * @Route("/api/keywords/{id}", name="update_keyword", methods={"PUT"})
	 * @param $id
	 * @param Request $request
	 * @param KeywordRepository $k_repo
	 * @return JsonResponse
	 * @throws \Doctrine\ORM\ORMException
	 * @throws \Doctrine\ORM\OptimisticLockException
	 */
	public function updateKeyword($id, Request $request, KeywordRepository $k_repo)
	{
		try {
			$data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
		} catch (JsonException $e) {
			return new JsonResponse(
				['error' => $e->getCode(), 'message' => $e->getMessage()],
				Response::HTTP_BAD_REQUEST
			);
		}

		$keyword = $k_repo->find($id);
		if (empty($keyword)) {
			return new JsonResponse(['message' => 'Wrong id'], Response::HTTP_NOT_FOUND);
		}

		$updated_rows = $k_repo->update($keyword, $data);

		$rows_length = count($updated_rows);
		if (!$rows_length) {
			return new JsonResponse(['message' => 'No data to update'], Response::HTTP_BAD_REQUEST);
		}

		$updated_rows_string = implode(',', $updated_rows);
		return new JsonResponse(
			['message' => "Item $updated_rows_string update"],
			Response::HTTP_OK
		);
	}

	/**
	 * @Route("/api/keywords/{id}", name="delete_keyword", methods={"DELETE"})
	 * @param $id
	 * @param Request $request
	 * @param KeywordRepository $k_repo
	 * @return JsonResponse
	 * @throws \Doctrine\ORM\ORMException
	 * @throws \Doctrine\ORM\OptimisticLockException
	 */
	public function deleteKeyword($id, Request $request, KeywordRepository $k_repo)
	{
		$keyword = $k_repo->find($id);

		if (empty($keyword)) {
			return new JsonResponse(['message' => 'Wrong id'], Response::HTTP_NOT_FOUND);
		}

		$k_repo->delete($keyword);

		return new JsonResponse(
			['message' => "Keyword $id deleted"],
			Response::HTTP_OK
		);
	}
}
