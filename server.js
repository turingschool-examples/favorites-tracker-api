const express = require('express');
const app = express();

app.set('port', 3001 || process.env.PORT);
app.use(express.json());

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.get('/', (request, response) => {
  return response.status(200).json({hello: "world", documentation: "repo URL to be added"});
});

// Login
app.get('/api/v1/login', (request, response) => {
  const { email, password } = request.body;
  database('users').where({ email, password })
    .then(users => {
      if (users.length) {
        const { id, name, email } = users[0];
        return response.status(200).json({ id, name, email });
      } else {
        return response.status(401).json({error: "Username or password incorrect"});
      }
    })
    .catch(err => response.status(500).json({error: err}));
});

// Users
// Create new user
app.post('/api/v1/users', (request, response) => {
  const { name, email, password } = request.body;
  database('users').insert({ name, email, password }, 'id')
    .then(id => {
      if (id.length) {
        return response.status(201).json({ name, email, id: id[0] });
      } else {
        return response.status(422).json({error: "Could not create user"});
      }
    })
    .catch(err => response.status(500).json({error: err}));
});

// Favorites middleware functions

function findUser(request, response, next) {
  const id = request.params.user_id;
  database('users').where({id})
    .then(users => {
      if (users.length) {
        next();
      } else {
        return response.status(404).json({error: `User id:${id} does not exist`});
      }
    })
    .catch(err => response.status(500).json({error: `Server error finding user: ${err}`}));
}

// Favorites helper functions

function addFavoriteForUser(request, response, tableName, data) {
  database(tableName).insert(data, '*')
    .then(favorite => {
      if (favorite) {
        return response.status(201).json(favorite[0]);
      } else {
        // Incorrect information was sent to create favorite
        return response.status(422).json({error: `Could not create favorite for user ${data.user_id}`});
      }
    })
    .catch(err => response.status(500).json({error: err}));
}

function findFavoritesForUser(request, response, tableName) {
  const { user_id } = request.params;

  database(tableName).where({user_id})
    .then(favorites => {
      return response.status(200).json({favorites});
    })
    .catch(err => response.status(500).json({error: err}));
}

function deleteFavoriteForUser(request, response, tableName) {
  const { user_id } = request.params;

  if (tableName === 'moviefavorites') {
    var criteria = {movie_id: request.params.movie_id, user_id};
  }

  // Strange error here where if invalid movie_id is supplied, then it goes tot he catch
  // and throws error without message...
  database(tableName).where(criteria)
    .then(favorites => {
      if (favorites.length) {
        database(tableName).where(criteria).del()
          .then(numRows => response.sendStatus(204))
          .catch(err => response.status(500).json({error: err}));
      } else {
        return response.status(404).json({error: `No records matched favorite id:${movie_id} for this user`});
      }
    })
    .catch(err => response.status(500).json({error: err}));
}

// FAVORITES ROUTES
// Get all favorites for a user
app.get('/api/v1/users/:user_id/:favorites_table', findUser, (request, response) => {
  const {favorites_table} = request.params;

  return findFavoritesForUser(request, response, favorites_table);
});

// Add favorite for a user
app.post('/api/v1/users/:user_id/:favorites_table', findUser, (request, response) => {
  const { user_id, favorites_table } = request.params;
  const { movie_id, title, poster_path, release_date, vote_average, overview } = request.body;
  
  return addFavoriteForUser(
    request,
    response,
    favorites_table,
    { movie_id, user_id, title, poster_path, release_date, vote_average, overview }
  );
});

// Delete favorite for a user
app.delete('/api/v1/users/:user_id/:favorites_table/:movie_id', findUser, (request, response) => {
  const {favorites_table} = request.params;

  return deleteFavoriteForUser(request, response, favorites_table);
});


app.listen(app.get('port'), () => {
  console.log(`Mod3 Tracker API running on http://localhost:${app.get('port')}`);
  console.log("Type control + c to stop the server.");
});
