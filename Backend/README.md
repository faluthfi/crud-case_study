# Description
This application was made for Binar Job Connect, this is a crud todo app made with NodeJS using ExpressJS framework and using postgres as database

# Installation & Running Instruction
clone this repo using
```
git clone
```
postgres are needed to run this program,
first install the database and table by running the database.sql through psql
by running the command below in the console
```
\i database.sql
```
**Beware that the database.sql will drop existing crud_jc database if exists!**

after that install the depedencies
```
npm install
```
then setup the environment variables

- SECRET_KEY='XXXXXX'

and

- PORT=XXXX

if needed

and setup the environment variable for database

- DB_USER='XXXXXX'

- DB_PASSWORD='XXXXXX'

- DB_HOST='XXXXXX'

- DB_PORT='XXXXXX'

or change it directly in ./db/index.js

then to run the program use, if there are no port in the environmental variables it will run in port 4000 by default


```
npm start
```
or
```
node index.js
```

# Using The Program
## Creating API Key
the routes for creating api key is:
```
/api-key/create
```
using **POST** method and receives request body of:
```
{
  "name":"example"
}
```

## Register and Login
API Key are needed to access the register and login 

the routes for register and login are
```
/auth/register?key=[your api key]
/auth/login?key=[your api key]
```
using **POST** method and receives request body of:
```
{
  "username":"[your username]",
  "password":"[your password]"
}
```
after logging in access token will be given in the response. put the token in Authorization in Headers

## Todos

Access token are needed to access all of the todo

### Create
the routes of creating todo is:
```
/todo/create
```
using **POST** Method 
Create todo receives request body of
```
{
  "description":"[the todo's description]"
}
```

### GET
the routes of fetching todo is:
```
/todo/get
```
using **GET** Method, the fetch is based on access token user id

### UPDATE
the routes of updating todo is:
```
/todo/update
```
using **PUT** Method 
Update todo receives request body of
```
{
  "id":"[todo id]",
  "description":"[the todo's description]"
}
```

### DELETE
the routes of updating todo is:
```
/todo/delete
```
using **DELETE** Method 
DELELETE todo receives request body of
```
{
  "id":"[todo id]"
}
```

