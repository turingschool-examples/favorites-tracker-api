const express = require('express');
const app = express();

app.set('port', 3001 || process.env.PORT);

app.get('/', (request, response) => {
  return response.status(200).json({hello: "world"});
});

app.listen(app.get('port'), () => {
  console.log(`Song Tracker API running on http://localhost:${app.get('port')}`);
});
