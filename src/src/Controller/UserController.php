<?php

namespace App\Controller;

use App\Repository\UserRepository;
use JsonException;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
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
	public function register(Request $request, UserRepository $u_repo, JWTTokenManagerInterface $JWTManager)
	{
		try {
			$user = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
		} catch (JsonException $e) {
			return new JsonResponse(
				['error' => $e->getCode(), 'message' => $e->getMessage()],
				Response::HTTP_BAD_REQUEST
			);
		}

		if (
			empty($user['username'])
			&& empty($user['password'])
			&& empty($user['email'])
			&& empty($data['confirmation'])
		) {
			return new JsonResponse(['error' => 'User incomplete'], Response::HTTP_BAD_REQUEST);
		}

		if (!empty($u_repo->findOneBy(['username' => $user['username']]))) {
			return new JsonResponse(
				['message' => 'This username is already used'],
				Response::HTTP_INTERNAL_SERVER_ERROR
			);
		}

		if (!empty($u_repo->findOneBy(['email' => $user['email']]))) {
			return new JsonResponse(
				['message' => 'This email is already used'],
				Response::HTTP_INTERNAL_SERVER_ERROR
			);
		}

		if ($user['confirmation'] !== $user['password']) {
			return new JsonResponse(['message' => 'Wrong confirmation password'], Response::HTTP_BAD_REQUEST);
		}

		$user_result = $u_repo->insert(
			$user['username'],
			$user['password'],
			$user['email'],
			$user['twitter_name']
		);
		$return      = [
			'id'           => $user_result->getId(),
			'username'     => $user_result->getUsername(),
			'email'        => $user_result->getEmail(),
			'twitter_name' => $user_result->getTwitterName(),
			'token'        => $JWTManager->create($user_result)

		];
		return new JsonResponse(['message' => "User registered", "user" => $return], Response::HTTP_CREATED);
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
				'id'           => $user->getId(),
				'username'     => $user->getUsername(),
				'email'        => $user->getEmail(),
				'twitter_name' => $user->getTwitterName()
			];
		}
		return new JsonResponse(["users" => $return], Response::HTTP_OK);
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
			'id'           => $user->getId(),
			'username'     => $user->getUsername(),
			'email'        => $user->getEmail(),
			'twitter_name' => $user->getTwitterName()
		];
		return new JsonResponse(["user" => $return], Response::HTTP_OK);
	}

	/**
	 * @Route("/api/user", name="user", methods={"GET"})
	 */
	public function getOwnUser(Request $request, UserRepository $u_repo)
	{
		$user   = $this->getUser();
		$return = [
			'id'       => $user->getId(),
			'username' => $user->getUsername(),
			'email'    => $user->getEmail(),
		];
		return new JsonResponse(["user" => $return], Response::HTTP_OK);
	}

	/**
	 * @Route("/api/user", name="delete_own_user", methods={"DELETE"})
	 */
	public function deleteOwnUser(Request $request, UserRepository $u_repo)
	{
		$u_repo->delete($this->getUser());
		return new JsonResponse(
			['message' => "Your account is deleted"],
			Response::HTTP_OK
		);
	}

	// This is the code for deleting a user from id but we don't have an admin connection.
	// So we can only, our own user
	// /**
	//  * @Route("/api/users/{id}", name="delete_user", methods={"DELETE"})
	//  */
	// public function deleteUser($id, Request $request, UserRepository $u_repo)
	// {
	//    $user = $u_repo->find($id);
	//
	//    if (empty($user)) {
	//       return new JsonResponse(['message' => 'Wrong id'], Response::HTTP_NOT_FOUND);
	//    }
	//
	//    $u_repo->delete($user);
	//
	//    return new JsonResponse(
	//       ['message' => "User $id deleted"],
	//       Response::HTTP_OK
	//    );
	// }

	/**
	 * @Route("/api/username", name="update_username", methods={"PUT"})
	 */
	public function updateUsername(Request $request, UserRepository $u_repo, JWTTokenManagerInterface $JWTManager)
	{
		try {
			$data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
		} catch (JsonException $e) {
			return new JsonResponse(
				['error' => $e->getCode(), 'message' => $e->getMessage()],
				Response::HTTP_BAD_REQUEST
			);
		}

		if (empty($data['username'])) {
			return new JsonResponse(['message' => 'Username is required'], Response::HTTP_BAD_REQUEST);
		}

		if (!empty($u_repo->findOneBy(['username' => $data['username']]))) {
			return new JsonResponse(
				['message' => 'This username is already used'],
				Response::HTTP_INTERNAL_SERVER_ERROR
			);
		}

		$user = $this->getUser();
		$user = $u_repo->update($user, $data);
		// TODO : return a new token
		return new JsonResponse(
			['message' => "Username updated", 'token' => $JWTManager->create($user)],
			Response::HTTP_OK
		);
	}

	/**
	 * @Route("/api/email", name="update_email", methods={"PUT"})
	 */
	public function updateEmail(Request $request, UserRepository $u_repo)
	{
		try {
			$data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
		} catch (JsonException $e) {
			return new JsonResponse(
				['error' => $e->getCode(), 'message' => $e->getMessage()],
				Response::HTTP_BAD_REQUEST
			);
		}

		if (empty($data['email'])) {
			return new JsonResponse(['message' => 'Email is required'], Response::HTTP_BAD_REQUEST);
		}

		if (!empty($u_repo->findOneBy(['email' => $data['email']]))) {
			return new JsonResponse(
				['message' => 'This email is already used'],
				Response::HTTP_INTERNAL_SERVER_ERROR
			);
		}

		$user = $this->getUser();
		$u_repo->update($user, $data);
		return new JsonResponse(
			['message' => "Email updated"],
			Response::HTTP_OK
		);
	}

	/**
	 * @Route("/api/password", name="update_password", methods={"PUT"})
	 */
	public function updatePassword(Request $request, UserRepository $u_repo, JWTTokenManagerInterface $JWTManager)
	{
		try {
			$data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
		} catch (JsonException $e) {
			return new JsonResponse(
				['error' => $e->getCode(), 'message' => $e->getMessage()],
				Response::HTTP_BAD_REQUEST
			);
		}

		$user = $this->getUser();

		if (empty($data['old_password']) || !$u_repo->checkPassword($user, $data['old_password'])) {
			return new JsonResponse(['message' => 'Wrong password'], Response::HTTP_BAD_REQUEST);
		}

		if (empty($data['confirmation']) || $data['confirmation'] !== $data['new_password']) {
			return new JsonResponse(['message' => 'Wrong confirmation password'], Response::HTTP_BAD_REQUEST);
		}

		if (empty($data['new_password'])) {
			return new JsonResponse(['message' => 'A new password is required'], Response::HTTP_BAD_REQUEST);
		}

		$user = $u_repo->update($user, ['password' => $data['new_password']]);
		// TODO : return a new token
		return new JsonResponse(
			['message' => "Password updated", 'token' => $JWTManager->create($user)],
			Response::HTTP_OK
		);
	}

	/**
	 * @Route("/api/twitter_name", name="update_twitter_name", methods={"PUT"})
	 */
	public function updateTwitterName(Request $request, UserRepository $u_repo)
	{
		try {
			$data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
		} catch (JsonException $e) {
			return new JsonResponse(
				['error' => $e->getCode(), 'message' => $e->getMessage()],
				Response::HTTP_BAD_REQUEST
			);
		}

		if (empty($data['twitter_name'])) {
			return new JsonResponse(['message' => 'twitter name is required'], Response::HTTP_BAD_REQUEST);
		}

		$user = $this->getUser();
		$u_repo->update($user, $data);
		return new JsonResponse(
			['message' => "Twitter name updated"],
			Response::HTTP_OK
		);
	}
}
