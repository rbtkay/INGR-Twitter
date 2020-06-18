﻿*IPSSI EISI-IT 21.1AW - Ines Jebli, Nolwenn Poilleux, Geoffrey Dazelle & Robert Khayat*

# Welcome on INGR-Twitter ! 😃

This project is licensed under the terms of the MIT license. <br/>
It uses Twitter API, Javascript library called ReactJS, Highcharts JS API and Symfony framework.

## Topic :
It's analytic plateform.
* Everybody can register and login to the site,
* Setup its Twitter account
* Then view all of its posted tweets
* And using keywords in the form of dashboard.

## User journey:
1. Connect to the Internet adress : http://localhost:3000/ <br/>
   Welcome on the plateform ! 🎉
2. If you don't already do so, you need to register. <br/>
   Select the Sign Up tab and please complete the next form.
3. Congratulations, it's your first connection ! <br/>
   You can see the dashboard.
4. Now, add one or many keywords.
5. See their chart. <br/>
   Choose your curve by clicking on the keyword. <br/>
   Hover the mouse cursor over the curve and read number of tweets using this keyword at a given date.
6. Delete keyword with the cross on hover event.
7. Look your last tweets on the right side.
8. At the top right, you can access to settings or disconnect. <br/>
   Click on settings. Modify your username, email address and Twitter login. <br/>
   Then, change your password.
9. Log out and login with your new username and password.
10. Return to the settings page and delete your account.


## Clone the project using the terminal :
```shell
git clone git@github.com:rbtkay/INGR-Twitter.git
```

## Launch INGR-Twitter on local machine

#### 1. Make sure you have ***docker*** installed on your machine ####
#### 2. Modify environment variables #### 
Rename the **.env.sample** from docker/ to **.env**, and insert your values:
- DATABASE_NAME
- DATABASE_USER
- DATABASE_PASSWORD
- DATABASE_ROOT_PASSWORD
- APP_SECRET
- JWT_PASSPHRASE
- TWITTER_API_ACCESS_TOKEN
- TWITTER_API_ACCESS_TOKEN_SECRET
- CONSUMER_KEY
- CONSUMER_SECRET


#### 2. Navigate to the appropriate folder ####
```shell
cd INGR-Twitter/docker/
```
#### 3. Run Project ####

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

## Contributing
INGR-Twitter is an Open Source project. Please review [source: [the guidelines for contributing]
(https://github.com/rbtkay/INGR-Twitter/blob/master/CONTRIBUTING.md)] and read [source: [the code of conduct] (https://github.com/rbtkay/INGR-Twitter/blob/master/CODE_OF_CONDUCT.md)]  to this repository. 
Become a maintainer ! 
