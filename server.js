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
        return response.status(200).json();
      }
      return response.status(401).json({error: "Username or password incorrect"});
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
      }
      return response.status(422).json({error: "Could not create user"});
    })
    .catch(err => response.status(500).json({error: err}));
});

// Movies


// Songs


// Books



app.listen(app.get('port'), () => {
  console.log(`Mod3 Tracker API running on http://localhost:${app.get('port')}`);
  console.log("Type control + c to stop the server.");
});
