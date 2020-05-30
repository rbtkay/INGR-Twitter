<?php

namespace App\Command;

use App\Entity\Tweet;
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
            ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description')
        ;
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

        $users  = $this->u_repo->findAll();
        $io->success($users[0]->getUsername());

        $dotenv = new Dotenv();
        $dotenv->load('/var/www/.env');


        $url ="https://api.twitter.com/1.1/statuses/user_timeline.json";

        $connection = new TwitterOAuth($_ENV["CONSUMER_KEY"], $_ENV["CONSUMER_SECRET"], $_ENV["TWITTER_API_ACCESS_TOKEN"], $_ENV["TWITTER_API_ACCESS_TOKEN_SECRET"]);
        $tweets = $connection->get("statuses/user_timeline", ["screen_name" => "ingr_project"]);


        foreach ($tweets as $tweet){
//            gettype($tweet);
//            $io->success($tweet->id);
//            $io->success($tweet->text);
//            $io->success($tweet->created_at);
            //insert into tweets in the database
            $this->t_repo->insert($tweet->id, $tweet->text, $tweet->created_at, $users[0]->getTwitterName(), $users[0]);
//            dd($tweet, gettype($tweet));
//            $io->success(gettype($tweet->id));
        }
        $myfile = fopen("../../var/www/result.txt", "a") or die("Unable to open file!");
        $txt = "The Cron is working \n";
        fwrite($myfile, $txt);
        $io->success('Command Completed');

        return 0;
    }
}
