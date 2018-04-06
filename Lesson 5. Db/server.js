const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const ObjectID = require('mongodb').ObjectID;
const Credentials = require('./credentials');
const { Task } = require('./models')

const port = 8000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/tasks', (req, res) => {
  Task.find().then(tasks => {
    res.status(200).json(tasks.map(task => task.toDto()));
  });
});
app.post('/task', (req, res) => {
  const task = new Task({
    name: req.body.name,
    creationDate: req.body.creationDate,
    dueDate: req.body.dueDate,
    done: req.body.done
  });
  task.save().then(result => {  
    console.log('result', result);
    res.status(200).json({id: result._id});
  });
});
app.patch('/task/:id/complete', (req, res) => {
  Task.findById(req.params.id).then(task => {
    task.complete();
    task.save().then(() => res.sendStatus(200));
  });
});
app.patch('/task/:id/postpone', (req, res) => {
  Task.findById(req.params.id).then(task => {
    task.postpone();
    task.save().then(() => res.sendStatus(200));
  });
});

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
  });
};

run();
