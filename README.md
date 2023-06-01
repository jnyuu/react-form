# React-form

## Setup

Using node version 16.15.0

```
npm i
```

### Needed for local setup :

1. .env file in the root directory (example .env structure below) with :

   - Your JWT secret (a string), a phrase or a code of your choosing, can be random, used for user login authentication
   - A port on which you want the app to run on
   - MongoDB instance (Mongo Database URI)
   - Google spreadsheet ID - copied from the general URL -> https://docs.google.com/spreadsheets/d/XXXXX/edit#gid=123456789, copy the ID from the URL (XXXXX)
   - "Add user key" - your key of choosing (string) which will be required when creating a new user

.env structure

```
JWT_SECRET="YOUR_JWT_SECRET"
PORT=3000
DATABASE_URI=mongodb+srv://xxx:xxx@xxx.xxx.mongodb.net/xxx
SPREADSHEET_ID="1_2ffJhRBr0J5UprjYxT_nBhYUb4a8KLbmNb3MU7nlCk"
ADD_USER_KEY="YOUR_ADD_USER_KEY"
```

2. keys.json file generated from the google spreadsheet api - in the backend/ directory

## API

1. /addUser

nazwy plikow
nazwy klas w tych plikach
ustawienie wartości z .env żeby działały
w backend/routes/addicpuser.js dodac wartosci z .env - spreadsheet oraz u góry klucz add_user_key
