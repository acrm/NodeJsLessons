const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require("mongodb").MongoClient;
const Credentials = require('./credentials');

const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));

const run = () => {
  const db = await MongoClient.connect(Credentials.getMongoDbConnectionString()); 
  app.listen(port, () => {
    console.log('We are live on ' + port);
    db.close();
  });
};
