/**
 * Dependencies
 */
const express = require('express');
const bodyParser = require('body-parser');
const templating = require('consolidate');

/**
 * App configuration
 */
const app = express();
app.use(bodyParser());
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
  res.send({message:'POST'});
});

/**
 * Server start
 */
app.listen(8888);

