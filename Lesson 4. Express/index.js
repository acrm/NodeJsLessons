/**
 * Dependencies
 */
const express = require('express');
const bodyParser = require('body-parser');
const templating = require('consolidate');
const {loadBash, loadTranslation} = require('./loader');

/**
 * App configuration
 */
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

/**
 * Requests handling
 */
app.get('/', function(req, res){
  res.render('index', {time: new Date()});
});
app.post('/run-command', function(req, res){
  const {command, params} = req.body;
  if(command === 'bash') {
    const {count} = params;
    loadBash(count).then(
    quotes => {
      res.status(200).send({quotes});
    },
    err => {
      res.status(500).send({error: 'Cannot load bash quotes'});
    });
  }
  else if(command === 'trans') {
    const {text} = params;
    loadTranslation(text).then(translation => {
      res.status(200).send({translation});
    }).catch(() => {
      res.status(500).send({error: 'Cannot translate text'});
    });
  }
  else {
    res.status(404).send({error: `Command ${command} is not found`});
  }
});

/**
 * Server start
 */
const port = 8888;
app.listen(port, () => {
  console.log(`Listen on ${port}`);
});

