DROP DATABASE IF EXISTS favorites_tracker;
CREATE DATABASE favorites_tracker;

\c favorites_tracker;

CREATE TABLE users (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR (123) NOT NULL,
  password VARCHAR (123) NOT NULL,
  email VARCHAR (123) NOT NULL
);

CREATE UNIQUE INDEX email ON users (email);

CREATE TABLE moviefavorites (
  id SERIAL NOT NULL PRIMARY KEY,
  movie_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  title VARCHAR (250) NOT NULL,
  poster_path VARCHAR (250) NOT NULL,
  release_date VARCHAR (250) NOT NULL,
  vote_average VARCHAR (250) NOT NULL,
  overview VARCHAR (1000) NOT NULL
);

CREATE TABLE bookfavorites (
  id SERIAL NOT NULL PRIMARY KEY,
  book_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  author_name VARCHAR (250) NOT NULL,
  book_name VARCHAR (250) NOT NULL,
  artwork_url VARCHAR (250) NOT NULL,
  release_date VARCHAR (250) NOT NULL,
  description TEXT NOT NULL,
  primary_genre_name VARCHAR (250) NOT NULL
);

CREATE TABLE albumfavorites (
  id SERIAL NOT NULL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  album_id INTEGER NOT NULL,
  artist_name VARCHAR (250) NOT NULL,
  album_name VARCHAR (250) NOT NULL,
  artwork_url VARCHAR (250) NOT NULL,
  release_date VARCHAR (250) NOT NULL,
  content_advisory_rating VARCHAR (250) NOT NULL,
  primary_genre_name VARCHAR (250) NOT NULL
);

INSERT INTO users (name, password, email)
  VALUES ('Alan', 'password', 'alan@turing.io');
