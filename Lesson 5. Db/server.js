const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Credentials = require('./credentials');
const { Task } = require('./models')

const port = 8000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const run = async () => {
  const dbInfo = Credentials.getMongoDbConnection();
  mongoose.connect(dbInfo.host, {
    user: dbInfo.auth.user,
    pass: dbInfo.auth.password
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Db connection error: '));
  db.once('open', function() {
    console.log('Db connection established');
  });
  app.listen(port, () => {
    console.log(`Started on ${port}`);
    const task = new Task({
      name: 'Submit homework'
    });
    console.log(task);
    task.save().then(res => {
      console.log(res);
      Task.find().then(res => {
        console.log(res);
      });
    });
  });
};

run();
