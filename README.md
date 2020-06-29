_IPSSI EISI-IT 21.1AW - Ines Jebli, Nolwenn Poilleux, Geoffrey Dazelle & Robert Khayat_

# Welcome on INGR-Twitter ! 😃

This project is licensed under the terms of the MIT license. <br/>
It uses Twitter API, Javascript library called ReactJS, Highcharts JS API and Symfony framework.

## Topic :

It's a analytic platform using the twitter api:

-   Everybody can register and login to the site.
-   Provide a twitter name to get the appropriate user's tweets.
-   Add a keyword that will be followed over time.
-   The chosen keywords will be displayed in a dashboard that shows the evolution of each keyword over time.

## Clone the project using the terminal :

```shell
git clone git@github.com:rbtkay/INGR-Twitter.git
```

## Launch INGR-Twitter on local machine

#### 1. Make sure you have **_docker_** installed on your machine

#### 2. Modify environment variables

Enter in INGR-Twitter dir and then rename the **.env.sample** from docker/ to **.env**, and insert your values:

-   DATABASE_NAME
-   DATABASE_USER
-   DATABASE_PASSWORD
-   DATABASE_ROOT_PASSWORD
-   APP_SECRET
-   JWT_PASSPHRASE
-   TWITTER_API_ACCESS_TOKEN
-   TWITTER_API_ACCESS_TOKEN_SECRET
-   CONSUMER_KEY
-   CONSUMER_SECRET

#### 2. Navigate to the appropriate folder

```shell
cd INGR-Twitter/docker/
```

#### 3. Run Project

If you've just clone the project execute

```shell
docker-compose up --build
```

The server might take several minutes to be ready for connections, it needs to wait for the database to finish setting up. Be patient ;)

If on the other hand you're pulling and already have a set of data established you can execute

```shell
docker-compose up
```

This last command will be faster since the database is already built

#### 4. Test Project

Click on signup and register with your twitter name.<br/>
Add a new keyword wich don't have a lot of tweets.<br/>
We are limited to 100 tweets recording by the API. You can try : `cute`,`truc`. You will see the number of tweets under your keywords on the graph. It will be update every ten minutes.<br/>
You can delete keywords by clicking on them in over the graph. Clicking on them in the graph will just make them appeared and disappeared on the graph.<br/>
On the left, you can see the tweets of the account you used in registering. In clicking on them, you can see them on twitter.<br/>
You can modify your profile in clicking on `Signed as ...` and `Settings`.

## User journey:

1. Connect to the Internet address : http://localhost:3000/ <br/>
   Welcome on the platform ! 🎉
2. If you don't already do so, you need to register. <br/>
   Select the Sign Up tab and please complete the next form.
3. Congratulations, it's your first connection ! <br/>
   You can see the dashboard and yours last ten tweets.
4. Now, add one or many keywords. We are limited to 100 tweets recording by the API. You can try : `cute`,`truc`, `health`
5. See their chart. <br/>
   You can toggle the display of a line by clicking on keywords from the graph. <br/>
   Hover the mouse cursor over the curve and read number of tweets using this keyword at a given date.
6. You can delete a keyword by clicking on it form the menu over the graph.
7. At the top right, you can access the settings or disconnect. <br/>
   Click on settings. You can modify your username, email address, Twitter login and password. <br/>
8. Log out and login with your new username and password.
9. You can return to the settings page and delete your account.

## Contributing

INGR-Twitter is an Open Source project. Please review [the guidelines for contributing](https://github.com/rbtkay/INGR-Twitter/blob/master/CONTRIBUTING.md) and read [the code of conduct](https://github.com/rbtkay/INGR-Twitter/blob/master/CODE_OF_CONDUCT.md) to this repository.
Become a maintainer !
