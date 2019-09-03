# Favorites Tracker

This project is working off the The Movie DB API or Itunes Apple API for audiobooks and music albums. The idea of the project is to be able to sign in as a user and save favorite movies, audiobooks, or albums (not all three, only one).

This repository will serve as your "backend", allowing you to connect to a persistent PostgreSQL database. You'll need to set up a separate client-side application (use `create-react-app`), to sit alongside this one. Do not put that project in the same repository as this one, save yourself a headache.

## Project Setup

* Clone down this repo and run `npm install`
* If you don't have postgresSQl, scroll down to `Setup Postgresql` and follow those steps.
* Run `npm start` - visit `localhost:3001/api/users` - you should see a json response with a single user.

## Setup Postgresql

#### IMPORTANT: If you already have Postgresql on your computer for some reason, you will need to uninstall it
For information on how to do this read [this](https://postgresapp.com/documentation/remove.html)

#### What is Postgresql?
* PostgreSQL is a powerful, open-source relational database system

#### Installation:
* Head over to [Postgres.app](http://postgresapp.com/) to download and install PostgreSQL
* When you click `initialize`, you should now be able to see that postgreSQL is running
* To be able to use the command line tools, you will need to run the following commannd in your terminal to configure your $PATH `sudo mkdir -p /etc/paths.d && echo /Applications/Postgres.app/Contents/Versions/latest/bin | sudo tee /etc/paths.d/postgresapp`
* You will need to close your terminal window and re-open it for the changes to take effect
  
#### Creating our database
* Make sure you are in you `movie-tracker` project folder
* From the command line, run the following command to create a users database `psql -f ./database/users.sql`
* When you start up the server (`npm install` and `npm start`), you should now be able to visit `localhost:3000/api/users` and see the database with a single user (Taylor)
  
#### Press CMD-T to create a new tab in your terminal
* Type `psql`. This will get you into the interactive postgres terminal. From here you can run postgres and sql commands. You might get an error *psql: FATAL: database "username" does not exist* To resolve this error type *createdb 'somthing does not exist'*

#### [PSQL Commands](http://postgresguide.com/utilities/psql.html)

## API - Endpoints

You will be using the fetch API to make all your api calls. If you are making a post request, note that you will need to pass in an options object with a method and headers - with a `'Content-Type': 'application/json'`. Additionally you will need to pass any any required fields into the body. Check out the [docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for additional info.

### User Account

The database starts off with a single user inside. -> { email: "alan@turing.io" password: "password" }

| purpose | url | verb | request body | sample success response |
|----|------|------|---------|---------------- |
| Login a user |`/api/v1/login`| GET | `{email: <String>, password: <String>}` | For matching email and password: `{id: 2, name: "Gary", email: "gary@gmail.com"}` |
| Create new user account |`/api/v1/users`| POST | `{name: <String>, email: <String>, password: <String>}` | For successful new account: `{id: 2, name: "Gary", email: "gary@gmail.com"}` |

Note that account emails must be unique.

### User Favorites

The `:favorites_type` should be replaced by the type of favorites your app is working with:

* `movieFavorites`
* `bookFavorites`
* `albumFavorites`

The `:user_id` should be replaced with the integer `id` of the user (given in the response from logging in).

The `:favorites_id` should be replaced with the `id` of the favorite.

The body of the POST request to add a favorite will differ depending on what data you are working with:

* `movieFavorites` requires: `movie_id, title, poster_path, release_date, vote_average, overview`
* `bookFavorites` requires: ``
* `albumFavorites` requires: ``

| purpose | url | verb | request body | sample success response |
|----|------|------|---------|---------------- |
| Add a favortie for a user | `/api/v1/users/:user_id/:favorites_type` | POST | `{}` | `{}` |
| Get all favorites for a user | `/api/v1/users/:user_id/:favorites_type` | GET | none | `{favorites: [array of favorites]}` |
| Delete a favorite for a user | `/api/v1/users/:user_id/:favorites_type/:favorite_id` | DELETE | none | 204 status code, no response body content |

##### Add Favorite: POST 

To save a favorite you must send into the body: movie_id, user_id and title, poster_path, release_date, vote_average, overview.
Keep in mind the response only gives the new favorite id

##### Receive All Favorites: GET 

To get a users favorite movies you need to send in the user ID through the params. This will return an array favorite objects.


