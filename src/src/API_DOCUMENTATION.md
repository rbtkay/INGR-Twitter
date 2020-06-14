#Roots

Base URL : `http://localhost:8080`


## CRUD Users

###Register User

URI : `/api/users`<br/>
Method : `POST`<br/>
Body JSON :
```ts
{
    "username": string,
    "email": string,
    "password": string,
    "confirmation": string,
    "twitter_name": string
}
```
Response JSON :
```ts
{
    "message": "User registered",
    "user": {
        "id": int,
        "username": string,
        "email": string,
        "twitter_name": string,
        "token": string
    }
}
```

###Login

URI : `/api/login_check`<br/>
Method : `POST`<br/>
Body JSON :
```ts
{
    "username": string,
    "password": string
}
```
Response JSON :
```ts
{
    "token": string
}
```

###Get Users

URI : `/api/users`<br/>
Method : `GET`<br/>
Authorization: `Bearer Token`<br/>
Response JSON :
```ts
{
    "users": [
        {
            "id": int,
            "username": string,
            "email": string,
            "twitter_name": string
        },
        ...
    ]
}
```

###Get User

URI : `/api/users/{id}`<br/>
Method : `GET`<br/>
Authorization: `Bearer Token`<br/>
Response JSON :
```ts
{
    "user": {
        "id": int,
        "username": string,
        "email": string,
        "twitter_name": string
    }
}
```

###Get Own User

URI : `/api/user`<br/>
Method : `GET`<br/>
Authorization: `Bearer Token`<br/>
Response JSON :
```ts
{
    "user": {
        "id": int,
        "username": string,
        "email": string,
        "twitter_name": string
    }
}
```

###Update Username

URI : `/api/username`<br/>
Method : `PUT`<br/>
Authorization: `Bearer Token`<br/>
Body JSON :
```ts
{
    "username": string
}
```
Response JSON :
```ts
{
    "message": "Username updated",
    "token": string
}
```

###Update Email

URI : `/api/email`<br/>
Method : `PUT`<br/>
Authorization: `Bearer Token`<br/>
Body JSON :
```ts
{
    "email": string
}
```
Response JSON :
```ts
{
    "message": "Email updated"
}
```

###Update Password

URI : `/api/password`<br/>
Method : `PUT`<br/>
Authorization: `Bearer Token`<br/>
Body JSON :
```ts
{
    "old_password": string,
    "new_password": string,
    "confirmation": string
}
```
Response JSON :
```ts
{
    "message": "Password updated",
    "token": string
}
```

###Delete Own User

URI : `/api/user`<br/>
Method : `DELETE`<br/>
Authorization: `Bearer Token`<br/>
Response JSON :
```ts
{
    "message": "Your account is deleted"
}
```

<!---
    Unused methods
    
    delete_user:
        path: /api/users/{id}
        controller: \App\Controller\UserController::deleteUser
        methods:[DELETE]
-->


##CRUD Keywords

###Add Keyword

URI : `/api/keywords`<br/>
Method : `POST`<br/>
Authorization: `Bearer Token`<br/>
Body JSON :
```ts
{
    "name": string
}
```
Response JSON :
```ts
{
    "message": "Keyword registered",
    "keyword": {
        "id": int,
        "name": string,
        "user_id": int,
        "scores": []
    }
}
```

###Get Keywords

URI : `/api/keywords`<br/>
Method : `GET`<br/>
Authorization: `Bearer Token`<br/>
Response JSON :
```ts
{
    "keywords": [
        {
            "id": int,
            "name": string,
            "scores": [
                {
                    "id": int,
                    "number": int,
                    "date": string
                },
                ...
            ]
        },
        ...
    ],
    "user_id": int
}
```

###Get Keyword

URI : `/api/keywords/{id}`<br/>
Method : `GET`<br/>
Authorization: `Bearer Token`<br/>
Response JSON :
```ts
{
    "keyword": {
        "id": int,
        "name": string,
        "user_id": int,
        "scores": [
            {
                "id": int,
                "number": int,
                "date": string
            }
        ]
    }
}
```

###Update Keyword

URI : `/api/keywords/{id}`<br/>
Method : `PUT`<br/>
Authorization: `Bearer Token`<br/>
Body JSON :
```ts
{
    "name": string
}
```
Response JSON :
```ts
{
    "message": "Item chill update",
    "keyword": {
        "id": int,
        "name": string,
        "user_id": int
    }
}
```

###Delete Keyword

URI : `/api/keywords/{id}`<br/>
Method : `DELETE`<br/>
Authorization: `Bearer Token`<br/>
Response JSON :
```ts
{
    "message": "Keyword deleted"
}
```

###Add Keyword Score

URI : `/api/keywords/{id}/scores`<br/>
Method : `POST`<br/>
Authorization: `Bearer Token`<br/>
Body JSON :
```ts
{
    "number": int,
    "date": string
}
```
Response JSON :
```ts
{
    "message": "Keyword score registered",
    "score": {
        "id": int,
        "number": int,
        "date": string,
        "keyword_id": int,
        "user_id": int
    }
}
```

###Get Keyword Scores

URI : `/api/keywords/{id}/scores`<br/>
Method : `GET`<br/>
Authorization: `Bearer Token`<br/>
Response JSON :
```ts
{
    "scores": [
        {
            "id": int,
            "number": int,
            "date": string
        },
        ...
    ],
    "keyword_id": int,
    "user_id": int
}
```


##Tweet

###Get Tweets

URI : `/api/tweets`<br/>
Method : `GET`<br/>
Authorization: `Bearer Token`<br/>
Response JSON :
```ts
{
    "tweets": [
        {
            "id": int,
            "twitter_id": string,
            "twitter_name": string,
            "tweet_content": string,
            "tweet_date": datetime
        },
        ...
    ],
    "user_id": int
}
```