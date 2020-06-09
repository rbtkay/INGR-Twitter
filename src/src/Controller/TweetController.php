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
     * @Route("/api/tweets/{user_id}", name="tweets", methods={"GET"})
     * @param Request $request
     * @param TweetRepository $t_repo
     * @return JsonResponse
     */
    public function getTweets($user_id, Request $request, TweetRepository $t_repo)
    {
        $tweets = $t_repo->findBy(["user" => $user_id]);

        $return   = [];
        foreach ($tweets as $tweet) {
            $return[] = [
                'id'     => $tweet->getId(),
                'twitter_name'   => $tweet->getTwitterName(),
                'content'   => $tweet->getTweetContent()
            ];
        }

        return new JsonResponse(["tweets" => $return], Response::HTTP_OK);
    }
}
