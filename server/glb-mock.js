module.exports = function(app) {
  var router = app.Router();

  router.post('/login.pl', function(req, res) {
    console.log("GLB Login", req.method, req.url, "\n Cookies:", req.headers.cookie, "\n Form:", req.body);
    res.cookie('sesId', '24024254415097447869', {maxAge: 20000});
    res.cookie('ses_hash', '47f0403ddb364028c6da8816c2742b5d2b0da90f', {maxAge: 20000});
    res.cookie('sessionId', '53455422411270944579', {maxAge: 20000});
    res.send("Mock Login Response");
  });

  return router;
};
