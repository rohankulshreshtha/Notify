var MongoClient = require( 'mongodb' ).MongoClient;
var config = require('../config/config')
var _db;

//making the singleton database instance 

module.exports = {
  connectToServer: function( callback ) {
    MongoClient.connect( config.db, function( err, db ) {
      if(err)console.log("cannot connect to the database"); //connection unsuccessful
      _db = db;
      console.log("connected to the database successfully");  //connected successfully
      return callback( err );
    } );
  },
  getDb: function() {
    return _db;   //returning the database instance
  }
};
