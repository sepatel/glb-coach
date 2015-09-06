var DataFetcher = require('./data-fetcher');

module.exports = function(app) {
  var router = app.Router();

  router.get('/team/:teamId', function(req, res) {
    respond(res, DataFetcher.getTeam(req.params.teamId));
  });

  router.get('/game/:gameId', function(req, res) {
    respond(res, DataFetcher.getGame(req.params.gameId));
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

