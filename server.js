const express = require('express');
const { MongoClient } = require('mongodb');
const db = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;

const connection = `mongodb://127.0.0.1:27017`;
const user = new MongoClient(connection);

user.connect()
  .then(() => {
    console.log('You are connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`App is listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('There is an error connecting to MonogoDB', err.message);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());