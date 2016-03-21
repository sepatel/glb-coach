var MongoClient = require('mongodb').MongoClient;
var Async = require('async');
var _ = require('underscore');
var Q = require('q');

var Config = require('../config');

Async.waterfall([
  function(callback) { // initialize db connection
    console.log("Connecting to ", Config.mongo, "...");
    MongoClient.connect(Config.mongo, function(err, mongodb) {
      me.db = mongodb;
      callback(err, mongodb);
    });
  }, function(mongodb, callback) { // initialize playbook
    console.log("Initializing playbook ...");
    var cursor = mongodb.collection('playbook').find();
    cursor.forEach(function(play) {
      me.playbook[play._id] = {
        name: play.name,
        formation: play.formation,
        type: play.type
      };
    }, function(err) {
      if (err) {
        callback(err);
      }

      callback(null, mongodb);
    });
  }, function(mongodb, callback) { // Initialize player archetypes
    console.log("Initializing player archetypes ...");
    var cursor = mongodb.collection('player').find();
    cursor.forEach(function(player) {
      me.playerArchtypeCache[player._id] = player.archetype;
    }, function(err) {
      if (err) {
        callback(err);
      }
      callback(null, mongodb);
    });
  }
], function(error, result) {
  if (error) {
    console.log("Error initialization database", error, result);
    process.exit(1);
  }
  console.log("All database initialization tasks completed!");
});

var me = module.exports = {
  db: null,
  playbook: {},
  playerArchtypeCache: {},
  find: function(collectionName, query, fields, options) {
    var collection = me.db.collection(collectionName);
    return Q.ninvoke(collection, 'find', query, fields, options).then(function(cursor) {
      return Q.ninvoke(cursor, 'toArray');
    });
  },
  findCursor: function(collectionName, query, fields, options) {
    var collection = me.db.collection(collectionName);
    return Q.ninvoke(collection, 'find', query, fields, options);
  },
  findOne: function(collectionName, query, fields, options) {
    var collection = me.db.collection(collectionName);
    return Q.ninvoke(collection, 'findOne', query, fields, options).then(function(doc) {
      if (doc == null) {
        throw "Not found";
      }
      return doc;
    });
  },
  fromMongo: function(src) {
    if (_.isArray(src)) {
      _.forEach(src, me.fromMongo);
    } else if (src.hasOwnProperty('_id')) {
      if (src._id.str) {
        srd.id = src._id.str;
      } else {
        src.id = src._id;
      }
      delete src._id;
    }

    return src;
  },
  toMongo: function(src) {
    if (_.isArray(src)) {
      _.forEach(src, me.toMongo);
    } else if (src.hasOwnProperty('id')) {
      src._id = src.id;
      delete src.id;
    }

    return src;
  }
};
