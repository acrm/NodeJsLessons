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
  console.log(req.body);
  res.send({message:'POST'});
});

/**
 * Server start
 */
const port = 8888;
app.listen(port, () => {
  console.log(`Listen on ${port}`);
});

