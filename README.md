# Quick Express Socket.io PostgresSQL Test

Endpoint for fetch requests: `http://localhost:3000/messages`

Supports GET all, DELETE, POST

First: 
* `npm install`
* set up a postgres database called api with:
  * one column called messages
* in queries.js, update the pool data w/ your postgres db data

Run project: `node app.js`

You can also serve the index.html file from a different port using `httpserver` (npm package)

Navigate to: `http://localhost:8000/`

_I do not guarantee the quality of this README for I am hungry, nor the quality of this code, but it works locally._