<?php

namespace App\Controller;

use App\Repository\UserRepository;
use JsonException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
	/**
	 * @Route("/api/users", name="register", methods={"POST"})
	 */
	public function register(Request $request, UserRepository $u_repo)
	{
		try {
			$user = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
		} catch (JsonException $e) {
			return new JsonResponse(
				['error' => $e->getCode(), 'message' => $e->getMessage()],
				Response::HTTP_BAD_REQUEST
			);
		}

		if (!empty($user['username']) && !empty($user['password']) && !empty($user['email'])) {
			$exists = $u_repo->findOneBy(['username' => $user['username']]);
			if (!empty($exists)) {
				return new JsonResponse(
					['message' => 'User for this username is already used'],
					Response::HTTP_INTERNAL_SERVER_ERROR
				);
			}
			$exists = $u_repo->findOneBy(['email' => $user['email']]);
			if (!empty($exists)) {
				return new JsonResponse(
					['message' => 'User for this email is already used'],
					Response::HTTP_INTERNAL_SERVER_ERROR
				);
			}
			$u_repo->insert($user['username'], $user['password'], $user['email']);

			return new JsonResponse(['message' => 'User registered'], Response::HTTP_CREATED);
		}
		return new JsonResponse(['error' => 'User incomplete'], Response::HTTP_BAD_REQUEST);
	}

	/**
	 * @Route("/api/users", name="users", methods={"GET"})
	 */
	public function getUsers(Request $request, UserRepository $u_repo)
	{
		$users  = $u_repo->findAll();
		$return = [];
		foreach ($users as $user) {
			$return[] = [
				'id'       => $user->getId(),
				'username' => $user->getUsername(),
				'email'    => $user->getEmail(),
			];
		}

		return new JsonResponse($return, Response::HTTP_OK);
	}

	/**
	 * @Route("/api/users/{id}", name="user", methods={"GET"})
	 */
	public function getUserById($id, Request $request, UserRepository $u_repo)
	{
		$user = $u_repo->find($id);

		if (empty($user)) {
			return new JsonResponse(['message' => 'Wrong id'], Response::HTTP_NOT_FOUND);
		}

		$return = [
			'id'       => $user->getId(),
			'username' => $user->getUsername(),
			'email'    => $user->getEmail(),
		];

		return new JsonResponse($return, Response::HTTP_OK);
	}

	/**
	 * @Route("/api/users/{id}", name="delete_user", methods={"DELETE"})
	 */
	public function deleteUser($id, Request $request, UserRepository $u_repo)
	{
		$user = $u_repo->find($id);

		if (empty($user)) {
			return new JsonResponse(['message' => 'Wrong id'], Response::HTTP_NOT_FOUND);
		}

		$u_repo->delete($user);

		return new JsonResponse(
			['message' => "User $id deleted"],
			Response::HTTP_OK
		);
	}

	/**
	 * @Route("/api/users/{id}", name="update_user", methods={"PUT"})
	 */
	public function updateUser($id, Request $request, UserRepository $u_repo)
	{
		try {
			$data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
		} catch (JsonException $e) {
			return new JsonResponse(
				['error' => $e->getCode(), 'message' => $e->getMessage()],
				Response::HTTP_BAD_REQUEST
			);
		}

		$user = $u_repo->find($id);
		if (empty($user)) {
			return new JsonResponse(['message' => 'Wrong id'], Response::HTTP_NOT_FOUND);
		}

		$updated_rows = $u_repo->update($user, $data);

		$rows_length = count($updated_rows);
		if (!$rows_length) {
			return new JsonResponse(['message' => 'No data to update'], Response::HTTP_BAD_REQUEST);
		}

		// TODO : return a new token
		$updated_rows_string = implode(', ', $updated_rows);
		return new JsonResponse(
			['message' => "Item $updated_rows_string update"],
			Response::HTTP_OK
		);
	}
}
