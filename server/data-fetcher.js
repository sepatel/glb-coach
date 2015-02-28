var MongoClient = require('mongodb').MongoClient;
var request = require('request');
var Cookie = require('tough-cookie').Cookie;
var utils = require('./utils');
var config = require('../config');

var cookieJar = request.jar();

module.exports = {
  login: function(callback) {
    MongoClient.connect(config.mongo, function(error, db) {
      var configCollection = db.collection('config');
      configCollection.findOne({_id: 'account'}, function(error, account) {
        if (error) {
          console.error("Unable to retrieve account information")
          process.exit(1);
          return;
        }

        if ((+account.expiration || 0) < +Date.now()) {
          console.info("Logging in with ", account);
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
              console.warn("Unexpected status code on login. Terminating until fixed", error, body);
              process.exit(1);
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
            callback(account);
          });
        } else {
          callback(account);
        }
      });
    });
  }
};

//request.defaults({jar: true});

//MongoClient.connect(config.mongo, accountLoad);

// {username: string, password: string, cookies: [{name: string, value: string, expiration: date}]}
/*
 var account = null;
 function accountLoad(error, result) {
 if (error) {
 return;
 }

 account = result;
 var now = new Date();
 console.info("Account loaded", account, (account.expiration || 0) < +now);

 if ((+account.expiration || 0) < +now) {
 if (account.cookies) {
 account.cookies.forEach(function(cookie) {
 cookieJar.setCookie(cookie.name, cookie.value);
 });
 }

 request.post({url: config.glbUrl + '/login.pl', jar: cookieJar, form: {
 user_name: account.username,
 password: account.password,
 action: 'Submit',
 x: utils.randomInt(25, 40),
 y: utils.randomInt(35, 50)
 }}, function(error, response, body) {
 console.info("Web Service Response status", response.statusCode, error, body, response.headers);
 console.info("What is the result now?", cookieJar, typeof cookieJar);

 if (response.headers['set-cookie'] instanceof Array)
 account.cookies = response.headers['set-cookie'].map(function(c) {
 return (Cookie.parse(c));
 }); else
 account.cookies = [Cookie.parse(response.headers['set-cookie'])];

 console.info("Account cookies are now", JSON.stringify(account.cookies));
 console.info("Expiration is ", account.cookies[0].expires);
 });
 }
 }
 */
