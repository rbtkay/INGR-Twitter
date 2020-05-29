<?php

namespace App\Command;

use App\Repository\UserRepository;
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

    public function __construct(UserRepository $u_repo)
    {
        $this->u_repo = $u_repo;

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

        $dotenv = new Dotenv();
        $dotenv->load('/var/www/.env');
//        dd($_ENV["TWITTER_API_ACCESS_TOKEN"]);
// You can also load several files


//        TWITTER_API_ACCESS_TOKEN=820346185974185984-BjPUMU2oktVoaQ6IX9kDTRsJguzsRua;
//        TWITTER_API_ACCESS_TOKEN_SECRET=ZjDbhRSav74fgVYEg6gDY0vrHc91HZL9eg46eBWp2yw4b;
//        CONSUMER_KEY=LIq1jsQscdOdLV5hFySxgG5gN;
//        CONSUMER_SECRET=AYvcwt9VNqx5MrThaA0WLVHtpurWGHxnxErvtOvTMwbgA63iFF;


        $url ="https://api.twitter.com/1.1/statuses/user_timeline.json";
//        $oauth_access_token = ;
//        $oauth_access_token_secret = ;
//        $consumer_key = ;
//        $consumer_secret = ;

        $connection = new TwitterOAuth($_ENV["CONSUMER_KEY"], $_ENV["CONSUMER_SECRET"], $_ENV["TWITTER_API_ACCESS_TOKEN"], $_ENV["TWITTER_API_ACCESS_TOKEN_SECRET"]);
        $tweets = $connection->get("statuses/user_timeline", ["screen_name" => "ingr_project"]);
//        $connection = new TwitterOAuth(, , , );
//        dd(gettype($statuses));
//
//        $oauth = array( 'oauth_consumer_key' => $consumer_key,
//            'oauth_nonce' => time(),
//            'oauth_signature_method' => 'HMAC-SHA1',
//            'oauth_token' => $oauth_access_token,
//            'oauth_timestamp' => time(),
//            'oauth_version' => '1.0');
//
//        // Make requests
//        $header = array(buildAuthorizationHeader($oauth), 'Expect:');
//        $options = array( CURLOPT_HTTPHEADER => $header,
//            //CURLOPT_POSTFIELDS => $postfields,
//            CURLOPT_HEADER => false,
//            CURLOPT_URL => $url,
//            CURLOPT_RETURNTRANSFER => true,
//            CURLOPT_SSL_VERIFYPEER => false);
//
//        $base_info = buildBaseString($url, 'GET', $oauth);
//        $composite_key = rawurlencode($consumer_secret) . '&' . rawurlencode($oauth_access_token_secret);
//        $oauth_signature = base64_encode(hash_hmac('sha1', $base_info, $composite_key, true));
//        $oauth['oauth_signature'] = $oauth_signature;
//
//        $feed = curl_init();
//        curl_setopt_array($feed, $options);
//        $json = curl_exec($feed);
//        curl_close($feed);
//
//        $twitter_data = json_decode($json);

        //print it out


        foreach ($tweets as $tweet){
//            gettype($tweet);
            $io->success($tweet->id);
            $io->success($tweet->text);
            $io->success($tweet->created_at);
//            dd($tweet, gettype($tweet));
        }
        $myfile = fopen("../../var/www/result.txt", "a") or die("Unable to open file!");
        $txt = "The Cron is working \n";
        fwrite($myfile, $txt);
        $io->success('Command Completed');

        return 0;
    }
}
