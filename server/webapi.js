var Q = require('q');
var DataFetcher = require('./data-fetcher');

module.exports = function(app) {
  var router = app.Router();

  router.get('/team/:teamId', function(req, res) {
    DataFetcher.getTeam(req.params.teamId).then(function(team) {
      console.info("Team to send back is", team._id, team.name);
      res.status(200);
      res.send(team);
    }).catch(function(error) {
      console.info("Error", error);
      res.status(500);
      res.send({error: error});
    });
  });

  router.get('/game/:gameId', function(req, res) {
    DataFetcher.getGame(req.params.gameId).then(function(game) {
      console.info("Game to send back is ", game);
      res.status(200);
      res.send(game);
    }).catch(function(error) {
      console.info("Error is ", error);
      res.status(500);
      res.send({error: error});
    });
  });

  router.get('/builds', function(req, res) {
    DataFetcher.build.get().then(function(guides) {
      res.status(200);
      res.send(guides);
    }).catch(function(error) {
      console.info("Error is ", error);
      res.status(500);
      res.send({error: error});
    });
  });

  router.delete('/build/:id', function(req, res) {
    DataFetcher.build.remove(req.params.id).then(function(guide) {
      res.status(200);
      res.send(guide);
    }).catch(function(error) {
      console.info("Error is ", error);
      res.status(500);
      res.send({error: error});
    });
  });


  router.post('/build', function(req, res) {
    console.info("Save Guide", req.body);
    DataFetcher.build.save(req.body).then(function(guide) {
      res.status(200);
      res.send(guide);
    }).catch(function(error) {
      console.info("Error is ", error);
      res.status(500);
      res.send({error: error});
    });
  });

  return router;
};

