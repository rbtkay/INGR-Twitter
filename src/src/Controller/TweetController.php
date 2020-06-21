<?php

namespace App\Controller;

use App\Repository\KeywordRepository;
use App\Repository\TweetRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TweetController extends AbstractController
{
	/**
	 * @Route("/tweets", name="tweets", methods={"GET"})
	 * @param Request $request
	 * @param TweetRepository $t_repo
	 * @return JsonResponse
	 */
	public function getTweets(Request $request, TweetRepository $t_repo)
	{
		$user   = $this->getUser();
		$tweets = $t_repo->findBy(["user" => $user]);

		$return = [];
		foreach ($tweets as $tweet) {
			$return[] = [
				'id'            => $tweet->getId(),
				'twitter_id'    => $tweet->getTwitterId() . "_id",
				'twitter_name'  => $tweet->getTwitterName(),
				'tweet_content' => $tweet->getTweetContent(),
				'tweet_date'    => $tweet->getTweetDate()->format('d/m/Y H:i')
			];
		}

		return new JsonResponse(["tweets" => $return, "user_id" => $user->getId(), "twitterid"=> $tweets[0]->getTwitterId()], Response::HTTP_OK);
	}
}
