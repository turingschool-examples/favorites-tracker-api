DROP DATABASE IF EXISTS favorites_tracker;
CREATE DATABASE favorites_tracker;

\c mod3_tracker;

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
  overview VARCHAR (250) NOT NULL
);

CREATE TABLE bookfavorites (
  id SERIAL NOT NULL PRIMARY KEY,
  book_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  artistName VARCHAR (250) NOT NULL,
  collectionName VARCHAR (250) NOT NULL,
  artworkUrl100 VARCHAR (250) NOT NULL,
  releaseDate VARCHAR (250) NOT NULL,
  description VARCHAR (250) NOT NULL,
  primaryGenreName VARCHAR (250) NOT NULL
);

CREATE TABLE albumfavorites (
  id SERIAL NOT NULL PRIMARY KEY,
  album_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  artistName VARCHAR (250) NOT NULL,
  collectionName VARCHAR (250) NOT NULL,
  artworkUrl100 VARCHAR (250) NOT NULL,
  releaseDate VARCHAR (250) NOT NULL,
  contentAdvisoryRating VARCHAR (250) NOT NULL,
  primaryGenreName VARCHAR (250) NOT NULL
);

INSERT INTO users (name, password, email)
  VALUES ('Alan', 'password', 'alan@turing.io');
