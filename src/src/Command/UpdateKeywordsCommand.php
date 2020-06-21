<?php

namespace App\Command;

use App\Entity\Score;
use App\Entity\Tweet;
use App\Entity\User;
use App\Helper\TweetHelper;
use App\Repository\UserRepository;
use App\Repository\TweetRepository;
use App\Repository\KeywordRepository;
use App\Repository\ScoreRepository;

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
    private $k_repo;
    private $s_repo;

    private TweetHelper $tweet_helper;

    public function __construct(UserRepository $u_repo, TweetRepository $t_repo, KeywordRepository $k_repo, ScoreRepository $s_repo, TweetHelper $tweet_helper)
    {
        $this->u_repo = $u_repo;
        $this->t_repo = $t_repo;
        $this->k_repo = $k_repo;
        $this->s_repo = $s_repo;

        $this->tweet_helper = $tweet_helper;
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
        // $arg1 = $input->getArgument('arg1');

        // if ($arg1) {
        //     $io->note(sprintf('You passed an argument: %s', $arg1));
        // }

        // if ($input->getOption('option1')) {
        //     // ...
        // }
        $users = $this->u_repo->findAll();
        foreach ($users as $user) {
            $this->tweet_helper->setScoreForKeywords($user, $this->k_repo, $this->s_repo);
            $this->tweet_helper->setUserTweets($user, $this->t_repo);
        }

        $io->success("Command Completed Successfully!");
        return 0;
    }
}
