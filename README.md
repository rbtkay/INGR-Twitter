*IPSSI EISI-IT 21.1AW - Ines Jebli, Nolwenn Poilleux, Geoffrey Dazelle & Robert Khayat*

# INGR-Twitter

*This project is licensed under the terms of the MIT license.*

## Topic :
It's analytic plateform.
* Everybody can register and login to the site,
* Setup its Twitter account
* Then view all of its posted tweets
* And using keywords in the form of dashboard.


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
