﻿*IPSSI EISI-IT 21.1AW - Ines Jebli, Nolwenn Poilleux, Geoffrey Dazelle & Robert Khayat*

# INGR-Twitter

*This project is licensed under the terms of the MIT license.*

## Topic :
It's analytic plateform.
* Everybody can register and login to the site,
* Setup its Twitter account
* Then view all of its posted tweets
* And using keywords in the form of dashboard.


## Clone the project using the terminal :
```
git clone git@github.com:rbtkay/INGR-Twitter.git
```

## Launch docker
```
cd INGR-Twitter/docker/

docker-compose up
```

## Modify environment variables
Rename the **.env.sample** from docker/ to **.env**, and insert your values :
 - DATABASE_NAME
 - DATABASE_USER
 - DATABASE_PASSWORD
 - DATABASE_ROOT_PASSWORD
 - APP_SECRET
 - JWT_KEY
 - TWITTER_KEY
