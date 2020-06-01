<?php

namespace App\Controller;

use App\Repository\KeywordRepository;
use App\Repository\ScoreRepository;
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
			if (substr($keyword['name'], 0, 1) !== "#") $keyword['name'] = "#" . $keyword['name'];

			$exists = $k_repo->findOneBy(
				[
					'name' => $keyword['name'],
					'user' => $this->getUser()
				]
			);
			if (!empty($exists)) {
				return new JsonResponse(
					['message' => 'This keyword is already added'],
					Response::HTTP_INTERNAL_SERVER_ERROR
				);
			}
			$keyword_result = $k_repo->insert($this->getUser(), $keyword['name']);
			$return         = [
				'id'      => $keyword_result->getId(),
				'name'    => $keyword_result->getName(),
				'user_id' => $keyword_result->getUser()->getId()
			];

			return new JsonResponse(['message' => 'Keyword registered', "keyword" => $return], Response::HTTP_CREATED);
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
				'id'   => $keyword->getId(),
				'name' => $keyword->getName(),
			];
		}

		return new JsonResponse(["keywords" => $return, "user_id" => $user->getId()], Response::HTTP_OK);
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
			'user_id' => $user->getId()
		];

		return new JsonResponse(["keyword" => $return], Response::HTTP_OK);
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

		$updated_rows = $k_repo->update($keyword, $data);
		$k_return     = [
			'id'      => $keyword->getId(),
			'name'    => $updated_rows['name'],
			'user_id' => $keyword->getUser()->getId(),
		];

		$rows_length = count($updated_rows);
		if (!$rows_length) {
			return new JsonResponse(['message' => 'No data to update'], Response::HTTP_BAD_REQUEST);
		}

		$updated_rows_string = implode(',', $updated_rows);
		return new JsonResponse(
			['message' => "Item $updated_rows_string update", 'keyword' => $k_return],
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

		$k_repo->delete($keyword);

		return new JsonResponse(
			['message' => "Keyword $id deleted"],
			Response::HTTP_OK
		);
	}

	/**
	 * @Route("/api/keywords/{id}/scores", name="insert_score", methods={"POST"})
	 * @param $id
	 * @param Request $request
	 * @param KeywordRepository $k_repo
	 * @param ScoreRepository $s_repo
	 * @return JsonResponse
	 * @throws \Doctrine\ORM\ORMException
	 * @throws \Doctrine\ORM\OptimisticLockException
	 */
	public function addScore($id, Request $request, KeywordRepository $k_repo, ScoreRepository $s_repo)
	{
		try {
			$data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
		} catch (JsonException $e) {
			return new JsonResponse(
				['error' => $e->getCode(), 'message' => $e->getMessage()],
				Response::HTTP_BAD_REQUEST
			);
		}

		$keyword = $k_repo->findOneBy(
			[
				"user" => $this->getUser(),
				"id"   => $id
			]
		);
		if (empty($keyword)) {
			return new JsonResponse(['message' => 'Wrong id'], Response::HTTP_NOT_FOUND);
		}
		if (empty($data['number'])) {
			return new JsonResponse(['message' => 'Score is required'], Response::HTTP_BAD_REQUEST);
		}

		// TODO : Score->getDate === current datetime ???
		//		$exists = $s_repo->findOneBy(
		//			[
		//				'number' => $data['number'],
		//				'keyword' => $id,
		//			]
		//		);
		//		if (!empty($exists)) {
		//			return new JsonResponse(
		//				['message' => 'Score\'s keyword for this datetime is already used'],
		//				Response::HTTP_INTERNAL_SERVER_ERROR
		//			);
		//		}
		$score_result = $s_repo->insertScore($keyword, $data);
		$return       = [
			'id'         => $score_result->getId(),
			'number'     => $score_result->getNumber(),
			'date'       => $score_result->getDate(),
			'keyword_id' => $score_result->getKeyword()->getId(),
			'user_id'    => $this->getUser()->getId()
		];

		return new JsonResponse(
			['message' => 'Keyword score registered', 'score' => $return], Response::HTTP_CREATED
		);
	}

	/**
	 * @Route("/api/keywords/{id}/scores", name="scores", methods={"GET"})
	 * @param $id
	 * @param Request $request
	 * @param KeywordRepository $k_repo
	 * @param ScoreRepository $s_repo
	 * @return JsonResponse
	 */
	public function getScores($id, Request $request, KeywordRepository $k_repo, ScoreRepository $s_repo)
	{
		$user    = $this->getUser();
		$keyword = $k_repo->findOneBy(
			[
				"user" => $user,
				"id"   => $id
			]
		);
		if (empty($keyword)) {
			return new JsonResponse(['message' => 'Wrong keyword id'], Response::HTTP_NOT_FOUND);
		}

		$scores = $s_repo->findBy(["keyword" => $keyword]);

		if (!count($scores)) {
			return new JsonResponse(['message' => 'No score data'], Response::HTTP_NOT_FOUND);
		}

		$return = [];
		foreach ($scores as $score) {
			$return[] = [
				'id'     => $score->getId(),
				'number' => $score->getNumber(),
			];
		}

		return new JsonResponse(
			["scores" => $return, "keyword_id" => $keyword->getId(), "user_id" => $user->getId()],
			Response::HTTP_OK
		);
	}

	/**
	 * @Route("/api/keywords/{k_id}/scores/{s_id}", name="score", methods={"GET"})
	 * @param $k_is
	 * @param $s_id
	 * @param Request $request
	 * @param ScoreRepository $s_repo
	 * @return JsonResponse
	 */
	public function getScoreById($k_id, $s_id, Request $request, KeywordRepository $k_repo, ScoreRepository $s_repo)
	{
		$user    = $this->getUser();
		$keyword = $k_repo->findOneBy(
			[
				"id"   => $k_id,
				"user" => $user,
			]
		);
		if (empty($keyword)) {
			return new JsonResponse(['message' => 'Wrong keyword id'], Response::HTTP_NOT_FOUND);
		}
		$score = $s_repo->findOneBy(
			[
				"id"      => $s_id,
				"keyword" => $keyword,
			]
		);
		if (empty($score)) {
			return new JsonResponse(['message' => 'Wrong score id'], Response::HTTP_NOT_FOUND);
		}

		$return = [
			'id'         => $score->getId(),
			'number'     => $score->getNumber(),
			'keyword_id' => $score->getKeyword()->getId(),
			'user_id'    => $user->getId()
		];

		return new JsonResponse(["score" => $return], Response::HTTP_OK);
	}
	// TODO : delete on cascade les scores quand on supprime un keyword

}
