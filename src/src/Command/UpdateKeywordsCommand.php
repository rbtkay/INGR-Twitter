<?php

namespace App\Command;

use App\Entity\Tweet;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Repository\TweetRepository;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Abraham\TwitterOAuth\TwitterOAuth;
use Symfony\Component\Dotenv\Dotenv;

class UpdateKeywordsCommand extends Command
{
    protected static $defaultName = 'update:keywords';

    private $u_repo;
    private $t_repo;

    public function __construct(UserRepository $u_repo, TweetRepository $t_repo)
    {
        $this->u_repo = $u_repo;
        $this->t_repo = $t_repo;

        parent::__construct();
    }

    protected function configure()
    {
        $this
            ->setDescription('Add a short description for your command')
            ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
            ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $arg1 = $input->getArgument('arg1');

        if ($arg1) {
            $io->note(sprintf('You passed an argument: %s', $arg1));
        }

        if ($input->getOption('option1')) {
            // ...
        }

        $users = $this->u_repo->findAll();
        $io->success($users[0]->getUsername());

        $dotenv = new Dotenv();
        $dotenv->load('/var/www/.env');

        $url = "https://api.twitter.com/1.1/statuses/user_timeline.json";

        $connection = new TwitterOAuth($_ENV["CONSUMER_KEY"], $_ENV["CONSUMER_SECRET"], $_ENV["TWITTER_API_ACCESS_TOKEN"], $_ENV["TWITTER_API_ACCESS_TOKEN_SECRET"]);

        foreach ($users as $user) {
            $tweets = $connection->get("statuses/user_timeline", ["screen_name" => $user->getTwitterName()]);
            $this->addTweets($tweets, $user);
            $this->deleteOldTweets($tweets, $user);
        }

        $io->success('Command Completed');
        return 0;
    }


    private function addTweets(array $tweets, User $user)
    {
        foreach ($tweets as $tweet) {
            $tweet_result = $this->t_repo->findOneById($tweet->id);
            if (is_null($tweet_result)) {
                $this->t_repo->insert($tweet->id, $tweet->text, $tweet->created_at, $user->getTwitterName(), $user);
            }
        }
    }

    private function deleteOldTweets(array $tweets, User $user)
    {
        $user_tweets = $this->t_repo->findTweetsByUser($user->getId());
//        $tweets_diff = array_diff_assoc($user_tweets, $tweets);
//        $tweets_diff = array_udiff($user_tweets, $tweets,
//            function ($user_tweet, $tweet) {
//                return $user_tweet-> - $tweet->tweet;
//            }
//        );
        $tweets_ids = array_map(function ($tweet) {
            return $tweet->id;
        }, $tweets);
//        $user_tweets = array_column($user_tweets, null, "twitter_id");
//        dump($user_tweets);
        foreach ($user_tweets as $user_tweet) {
            // Use the propertyName value from array1 to find details
//            dump($tweet);
            $is_still_here = in_array($user_tweet->getTwitterId(), $tweets_ids);
            dump($is_still_here);
            if(!$is_still_here){
                //delete tweet from database;
            }
//            dump ($user_tweets[$tweet->id]);
        }
//
//        if(count($tweets_diff) > 0){
//        foreach ($tweets as $tweet){
//            dump($tweet->id);
//        }
//        }
        echo "Syccess";
//        dump("Delete Success");
//        dump($user_tweets);
//        foreach ($tweets as $tweet) {
//            $tweet_result = $this->t_repo->findOneById($tweet->id);
//            if (is_null($tweet_result)) {
//                $this->t_repo->insert($tweet->id, $tweet->text, $tweet->created_at, $user->getTwitterName(), $user);
//            }
//        }
    }

    function getId()
    {

    }
}
