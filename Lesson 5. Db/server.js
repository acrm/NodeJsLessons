const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require("mongodb").MongoClient;
const Credentials = require('./credentials');

const port = 8000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const run = async () => {
  const mongoConnection = Credentials.getMongoDbConnection();
  const mongoClient = await MongoClient.connect(mongoConnection.host, mongoConnection.auth); 
  app.listen(port, () => {
    console.log(`Started on ${port}`);
    const db = mongoClient.db('njslessons');

    const test = { f1: 'hello', f2: 'world'};
    db.collection('test').insert(test, (err, results) => {
      console.log('inserted');
      console.log('err', err);
      console.log('results ', results);
      const res = db.collection('test').find().toArray().then(res => console.log('res: ', res), err => console.log('err: ', res));
      

      mongoClient.close();
    });
  });
};

run();
