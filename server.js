const express = require('express');
const { MongoClient } = require('mongodb');
const db = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./routes')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for mongodb running on port ${PORT}!`);
  });
});

