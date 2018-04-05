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
  app.get('/tasks', (req, res) => {
    Task.find().then(tasks => {
      res.status(200).json(tasks.map((task) => {
        return {
          name: task.name,
          creationDate: task.creationDate,
          dueDate: task.dueDate,
          done: task.done
        };
      }));
    });
  });
  app.post('/task', (req, res) => {
    const task = new Task({
      name: req.body.name,
      creationDate: req.body.creationDate,
      dueDate: req.body.dueDate,
      done: req.body.done
    });
    task.save().then(res => {  
      res.status(200).json({id: res._id});
    });
  });
  app.listen(port, () => {
    console.log(`Started on ${port}`); 
  });
};

run();
