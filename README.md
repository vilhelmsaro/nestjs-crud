## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## License

Nest is [MIT licensed](LICENSE).

## APIs

register - http://localhost:3000/auth/register

`POST /auth/register`
### Response
    Status: 201 Created
    User created.


login - http://localhost:3000/auth/login

`POST /auth/login`
### Response
    Status: 201 Created
    {"access_token":"JWT_TOKEN"}


get user - http://localhost:3000/users/id

`GET /users/id`
### Response
    Status: 200 OK
    {"name": "NAME","surname": "SURNAME","email": "example@email.com"}

Notes

    1. I created index on the field "mail" in users table, as it is very common to do a query based on users' email.
    2. App works on two seperate modules, auth and users
    3. DB's name is crudDb(don't ask me why)
    4. local and JWT strategies are used through passport for email|password based login and APIs' authentication respectively
Things that could be developed

    1. One thing for sure, didn't have much time for deep dive into usage of JWT(I would use JWE(Encrypted)), also refresh token could be used for further development!
    2. Config file(env variables)
    3. It would be worth to work on login route validation, as with guards included,it is a little bit tricky to also use pipes with priority!