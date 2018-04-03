/**
 * Dependencies
 */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const templating = require('consolidate');
const path = require('path');
const {loadBash, loadTranslation} = require('./loader');

/**
 * App configuration
 */
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));
app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

/**
 * Requests handling
 */
app.get('/', function(req, res){
  const vm = {
    isBash: req.cookies.acrm.default === 'bash',
    isTrans: req.cookies.acrm.default === 'trans',
    isDefault: req.cookies.acrm.default !== 'bash' && req.cookies.default !== 'trans' 
  };
  res.render('index', vm);
});
app.post('/run-command', function(req, res){
  const {command, params} = req.body;
  if(command === 'bash') {
    const {count} = params;
    loadBash(count).then(
    quotes => {
      res.status(200).cookie('acrm', {default: command}).send({quotes});
    },
    err => {
      res.status(500).send({error: 'Cannot load bash quotes'});
    });
  }
  else if(command === 'trans') {
    const {text} = params;
    loadTranslation(text).then(translation => {
      res.status(200).cookie('acrm', {default: command}).send({translation});
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

