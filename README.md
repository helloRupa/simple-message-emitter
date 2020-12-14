# Quick Express Socket.io PostgresSQL Test

Endpoint for socket comms: `http://localhost:8000`

Endpoint for fetch requests: `http://localhost:8000/messages`

Supports GET for HTTP requests, GET and POST on socket

First: 
* `npm install`
* Update `config.json` with appropriate DB details
* Run the migrations and seed: `npx sequelize-cli db:migrate` then `npx sequelize-cli db:seed:all`

Run project: `node app.js`

You can also serve the index.html file from a different port using `httpserver` (npm package)

Navigate to: `http://localhost:8000/`

_I do not guarantee the quality of this README for I am hungry, nor the quality of this code, but it works locally._