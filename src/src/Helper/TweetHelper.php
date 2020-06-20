<?php


namespace App\Helper;


use Abraham\TwitterOAuth\TwitterOAuth;
use App\Entity\Keyword;
use App\Entity\User;
use App\Repository\KeywordRepository;
use App\Repository\ScoreRepository;
use App\Repository\TweetRepository;

class TweetHelper
{
    private TwitterOAuth $connection;

    function __construct() {
        $connection = new TwitterOAuth(getenv("CONSUMER_KEY"), getenv("CONSUMER_SECRET"), getenv("TWITTER_API_ACCESS_TOKEN"), getenv("TWITTER_API_ACCESS_TOKEN_SECRET"));
        $this->connection = $connection;
    }

    public function getUserTweets(User $user){
        $url = "statuses/user_timeline";
        return $this->connection->get($url, ["screen_name" => $user->getTwitterName()]);
    }

    public function setScoreForKeywords(User $user, KeywordRepository $k_repo, ScoreRepository $s_repo){
        $keywords = $k_repo->findBy(["user"=> $user->getId()]);
        dump("user keyword");
        dump($keywords);
        foreach ($keywords as $keyword){
            $keyword_in_tweets = $this->connection->get("search/tweets", ["q" => $keyword->getName(), "count" => "100"]);

            $tweet_count = $this->getTweetCount($s_repo, $keyword_in_tweets, $keyword);

            date_default_timezone_set('Europe/Paris');
            $date_now = date("Y-m-d H:i:s");
            $data = [
                "number" => $tweet_count,
                "date"=> $date_now
            ];

            dump($tweet_count);

            $s_repo->insertScore($keyword, $data);
        }
    }

    public function setUserTweets(User $user, TweetRepository $t_repo){
        dump("setting user tweets");
        $url = "statuses/user_timeline";
        $user_tweets = $this->connection->get($url, ["screen_name" => $user->getTwitterName()]);
        dump($user);
        dump($user_tweets);
        if(gettype($user_tweets) == "array"){ // if $tweets is an object it represents the error coming back from the twitter api.
            $this->addNewTweets($user_tweets, $user, $t_repo); //add new tweets in case they're not already stored
            $this->deleteOldTweets($user_tweets, $user, $t_repo); //delete from the database tweets deleted from twitter
        }else{
            $this->deleteOldTweets([], $user, $t_repo); // when $tweets is an object (an error) we need to clear the table from the old tweets
        }
    }

    private function addNewTweets(array $tweets, User $user, TweetRepository $t_repo)
    {
        foreach ($tweets as $tweet) {
            $tweet_result = $t_repo->findOneBy(["twitter_id"=> $tweet->id]);
            if (is_null($tweet_result)) {
                $t_repo->insert($tweet->id, $tweet->text, $tweet->created_at, $user->getTwitterName(), $user);
            }
        }

    }

    private function deleteOldTweets(array $tweets, User $user, TweetRepository $t_repo)
    {
        $user_tweets = $t_repo->findBy(["user" => $user]);

        $tweets_ids = [];
        if(count($tweets) > 0){
            $tweets_ids = array_map(function ($tweet) {
                return $tweet->id;
            }, $tweets);
        }

        for ($i = 0; $i < count($user_tweets); $i++) {
            $user_tweet_id = $user_tweets[$i]->getTwitterId();
            if (!in_array($user_tweet_id, $tweets_ids)) {
                $t_repo->delete($user_tweets[$i]);
            }
        }
    }

    private function getTweetCount(ScoreRepository $s_repo, object $keyword_in_tweets, Keyword $keyword){

        $tweet_count = 0;

        try{
            $tweet_count = count($keyword_in_tweets->statuses);
        }catch(\Exception $e){
            $oldScores = $s_repo->findBy(["keyword"=> $keyword], ["id"=>"DESC"]);
            if(count($oldScores) > 0){
                $tweet_count = $oldScores[0]->getNumber();
            }
        }
        return $tweet_count;
    }
}