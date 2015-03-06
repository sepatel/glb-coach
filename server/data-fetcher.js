var Q = require('q');

var MongoClient = require('mongodb').MongoClient;
var request = require('request');
var Cookie = require('tough-cookie').Cookie;
var utils = require('./utils');
var config = require('../config');

var cookieJar = request.jar();

// TODO: Define a proper error structure rather then free formed strings

module.exports = {
  login: function() {
    var defer = Q.defer();
    MongoClient.connect(config.mongo, function(error, db) {
      if (error) {
        return defer.reject("Unable to connect to the database");
      }

      var configCollection = db.collection('config');
      configCollection.findOne({_id: 'account'}, function(error, account) {
        if (error) {
          return defer.reject("Unable to read the database");
        } else if (!account) {
          return defer.reject("Unable to retrieve account information");
        }
        console.info("Logging in with ", account);

        if ((+account.expiration || 0) < +Date.now()) {
          for (var i in account.cookies || {}) {
            cookieJar.add(request.cookie(i + "=" + account.cookies[i]), config.glbUrl);
          }

          request.post({url: config.glbUrl + '/login.pl', jar: cookieJar, form: {
            user_name: account.username, password: account.password,
            action: 'Submit',
            x: utils.randomInt(25, 40),
            y: utils.randomInt(35, 50)
          }}, function(error, response, body) {
            if (response.statusCode != 200) {
              return defer.reject("Unexpected status code on login. Terminating until fixed", error, body);
            }
            var cookies = response.headers['set-cookie'].map(function(c) {
              return (Cookie.parse(c));
            });
            account.cookies = {};
            for (var i in cookies) {
              console.info("Cookie is ", JSON.stringify(cookies[i]));
              account.expiration = cookies[i].expires;
              account.cookies[cookies[i].key] = cookies[i].value;
            }

            configCollection.update({_id: 'account'}, account);
            return defer.resolve(account);
          });
        } else {
          return defer.resolve(account);
        }
      });
    });
    return defer.promise;
  }
};

