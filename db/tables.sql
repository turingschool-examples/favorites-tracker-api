DROP DATABASE IF EXISTS mod3_tracker;
CREATE DATABASE mod3_tracker;

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
  title VARCHAR (123) NOT NULL,
  poster_path VARCHAR (250) NOT NULL,
  release_date VARCHAR (123) NOT NULL,
  vote_average VARCHAR (123) NOT NULL,
  overview VARCHAR NOT NULL
);

CREATE TABLE bookfavorites (
  id SERIAL NOT NULL PRIMARY KEY,
  book_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL

);

CREATE TABLE songfavorites (
  id SERIAL NOT NULL PRIMARY KEY,
  song_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL

);

INSERT INTO users (name, password, email)
  VALUES ('Alan', 'password', 'alan@turing.io');
