# Favorites Tracker

This project is working off the The Movie DB API or iTunes Apple API for audiobooks and music albums. The idea of the project is to be able to sign in as a user and save favorite movies, audiobooks, or albums (not all three, only one).

This repository will serve as your "backend", allowing you to connect to a persistent PostgreSQL database. You'll need to set up a separate client-side application (use `create-react-app`), to sit alongside this one. Do not put that project in the same repository as this one, save yourself a headache.

## Project Setup

* Clone down this repo and run `npm install`
* If you don't have postgresSQl, scroll down to `Setup Postgresql` and follow those steps
* Run `npm start` - visit `localhost:3001/` - you should see a JSON response some information

## Setup Postgresql

#### IMPORTANT: If you already have Postgresql on your computer for some reason, you will need to uninstall it
For information on how to do this read [this](https://postgresapp.com/documentation/remove.html)

#### What is PostgreSQL?
* PostgreSQL is a powerful, open-source relational database system

#### Installation:
* Head over to [Postgres.app](http://postgresapp.com/) to download and install PostgreSQL
* When you click `initialize`, you should now be able to see that postgreSQL is running
* To be able to use the command line tools, you will need to run the following commannd in your terminal to configure your $PATH `sudo mkdir -p /etc/paths.d && echo /Applications/Postgres.app/Contents/Versions/latest/bin | sudo tee /etc/paths.d/postgresapp`
* You will need to close your terminal window and re-open it for the changes to take effect
  
#### Creating our database
* Make sure you are in you `favorties-tracker-api` directory
* From the command line, run the following command to create a users database `psql -f ./db/tables.sql`
* When you start up the server (`npm install` and `npm start`), you should now be able to visit `localhost:3001/` and you should see a JSON response some information
  
#### Press CMD-T to create a new tab in your terminal
* Type `psql`. This will get you into the interactive postgres terminal. From here you can run postgres and sql commands. You might get an error *psql: FATAL: database "username" does not exist* To resolve this error type *createdb 'something does not exist'*

#### [PSQL Commands](http://postgresguide.com/utilities/psql.html)

## API - Endpoints

You will be using the fetch API to make all your API calls. If you are making a post request, note that you will need to pass in an options object with a method and headers - with a `'Content-Type': 'application/json'`. Additionally you will need to pass any any required fields into the body. Check out the [docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for additional info.

### User Account

The database starts off with a single user inside. -> { email: "alan@turing.io" password: "password" }

| Purpose | URL | Verb | Request Body | Sample Success Response |
|----|----|----|----|----|
| Login a user |`/api/v1/login`| GET | `{email: <String>, password: <String>}` | For matching email and password: `{id: 2, name: "Alex", email: "alex@gmail.com"}` |
| Create new user account |`/api/v1/users`| POST | `{name: <String>, email: <String>, password: <String>}` | For successful new account: `{id: 1, name: "Alan", email: "alan@turing.io"}` |

Note that account emails must be unique.

### User Favorites

The `:user_id` should be replaced with the integer `id` of the user (given in the response from logging in).

The `:favorites_type` should be replaced by the type of favorites your app is working with:

* `moviefavorites`
* `bookfavorites`
* `albumfavorites`

The `:favorites_id` should be replaced with the `id` of the favorite (the `movie_id`, `book_id`, or `album_id`).

The body of the POST request to add a favorite will differ depending on what data you are working with:

* `moviefavorites` requires: `movie_id (Integer), title (String), poster_path (String), release_date (String), vote_average (String), overview (String)`
* `bookfavorites` requires: `book_id (Integer), author_name (String), book_name VARCHAR (String), artwork_url (String), release_date (String), description (String), primary_genre_name (String)`
* `albumfavorites` requires: `album_id (Integer), artist_name (String), album_name (String), artwork_url (String), release_date (String), content_advisory_rating (String), primary_genre_name (String)`

*Note:* The object keys passed in the request body will not completely match the object keys given back from the iTunes Search API

| Purpose | URL | Verb | Request Body | Sample Success Response |
|----|----|----|----|----|
| Add a favorite for a user | `/api/v1/users/:user_id/:favorites_type` | POST | `{see above for information to include in this object}` | `{}` |
| Get all favorites for a user | `/api/v1/users/:user_id/:favorites_type` | GET | none | `{favorites: [array of favorites]}` |
| Delete a favorite for a user | `/api/v1/users/:user_id/:favorites_type/:favorite_id` | DELETE | none | 204 status code, no response body content |

