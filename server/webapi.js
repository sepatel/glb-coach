var DataFetcher = require('./data-fetcher');
var GamePlanner = require('./game-planner');

module.exports = function(app) {
  var router = app.Router();

  router.get('/team/:teamId', function(req, res) {
    respond(res, DataFetcher.team.get(parseInt(req.params.teamId)));
  });
  router.get('/teams', function(req, res) {
    respond(res, DataFetcher.team.getAll());
  });

  router.get('/games/vs/:teamId', function(req, res) {
    respond(res, DataFetcher.game.getVerses(parseInt(req.params.teamId)));
  });
  router.get('/game/:gameId', function(req, res) {
    respond(res, DataFetcher.getGame(parseInt(req.params.gameId)));
  });

  router.get('/builds', function(req, res) {
    respond(res, DataFetcher.build.get());
  });

  router.delete('/build/:id', function(req, res) {
    respond(res, DataFetcher.build.remove(req.params.id));
  });

  router.post('/build', function(req, res) {
    console.info("Save Guide", req.body);
    respond(res, DataFetcher.build.save(req.body));
  });

  /*
  router.get('/offense/ai/:teamId', function(req, res) {
    respond(res, GamePlanner.gamePlanOffAiStats(parseInt(req.params.teamId)));
  });
  */

  router.post('/offense/ai/gameplan', function(req, res) {
    var opponentId = +req.body.teamId;
    var gameIds = req.body.gameIds;
    GamePlanner.gamePlanOffAiFact(opponentId, gameIds).then(function(facts) {
      respond(res, GamePlanner.gamePlanOffAiStats(opponentId));
    }).catch(function(error) {
      console.info("Error", error.stack);
      res.status(500);
      res.send({error: error});
    });
  });

  router.post('/offense/ai/formation', function(req, res) {
    var opponentId = +req.body.teamId;
    var gameIds = req.body.gameIds;
    GamePlanner.gamePlanOffAiFact(opponentId, gameIds).then(function(facts) {
      respond(res, GamePlanner.gamePlanOffAiFormation(opponentId));
    }).catch(function(error) {
      console.info("Error", error.stack);
      res.status(500);
      res.send({error: error});
    });
  });

  return router;
};

function respond(res, promise) {
  promise.then(function(result) {
    res.status(200);
    res.send(result);
  }).catch(function(error) {
    console.info("Error", error);
    res.status(500);
    res.send({error: error});
  });
}

