# React-form

## Setup

Using node version 16.15.0

```
npm i
```

### Everything needed for local setup :

1. Download keys.json (backend/keys.json) file - generated from the google spreadsheet api

   - https://console.cloud.google.com/apis/library/browse?pli=1&q=spreadshet - enable the spreadsheet api
   - https://console.cloud.google.com/apis/credentials - add a service account for the project - add a key (choose the JSON option) it will download automatically
   - https://console.cloud.google.com/apis/credentials/consent - publish your app to production
   - after downloading the json when creating the key to the service account change its name to keys.json and insert it into backend/ folder

2. Create mongoDBcluster, create a user, enable access from your IP address, go to "Connect" -> "Drivers", copy the connection string into the .ENV (DATABASE_URI), change the "<password>" to your mongoDB user password

3. Create a google sheet, copy its id from the URL, enable access to it to everyone with the link

4. Create an .env file in the root directory (example .env structure below) with :

   - Your JWT secret (a string), a phrase or a code of your choosing, can be random, used for user login authentication - you don't need to remember it
   - A port on which you want the app to run on
   - MongoDB instance (Mongo Database URI)
   - Google spreadsheet ID - copied from the general URL -> https://docs.google.com/spreadsheets/d/XXXXX/edit#gid=123456789, copy the ID from the URL (XXXXX)
   - "Add user key" - your key of choosing (string) - it will be required when creating a new user (localhost:3000/addUser)

### .env structure with example values

```
JWT_SECRET="YOUR_JWT_SECRET"
PORT=3000
DATABASE_URI=mongodb+srv://xxx:xxx@xxx.xxx.mongodb.net/xxx
SPREADSHEET_ID="1_2ffJhRBr0J5UprjYxT_nBhYUb4a8KLbmNb3MU7nlCk"
ADD_USER_KEY="YOUR_ADD_USER_KEY"
```

## Description

1. Form auto saves to mongoDB after filling out fields and swapping pages

## Adding a user

1. localhost:PORT/addUser

## Starting the server

```
npm run start
```
