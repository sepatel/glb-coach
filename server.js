var Q = require('q');
var express = require('express');
var bodyParser = require('body-parser');
var glbMockRouter = require('./server/glb-mock')(express);
var config = require('./config');
var dataFetcher = require('./server/data-fetcher');

Q.delay(2000).then(function() {
  dataFetcher.login().then(function(account) {
    console.info("Logged in with account", account.username, "session expires", account.expiration);
    dataFetcher.getTeam(3295).then(function(team) {
      console.info("Team html is", team.name);
    }).catch(function(error) {
      console.error("Unable to retrieve team", error);
    });
  }).catch(function(error) {
    console.error("I have broken somewhere", error);
  });
});
console.log("Waiting 2 seconds for system and db connections to establish before executing initialization");

var app = express();

var router = express.Router();
router.get('/version', function(req, res) {
  res.send({release: config.version, erase: []});
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/client'));

app.use('/game', glbMockRouter);
app.use('/', router);

app.use(function(req, res) {
  res.status(404).send({code: 404, message: 'Web Service Not Found'});
});

app.use(function(error, req, res) {
  res.status(500).send({code: 500, message: 'Internal Server Error'});
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});