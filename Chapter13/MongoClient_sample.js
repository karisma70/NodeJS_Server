
/*
var MongoClient = require('mongodb').MongoClient,
    test = require('assert');
// Connection url
// var url = 'mongodb://localhost:27017/test';
var url = 'mongodb://test@localhost:27017';
// Connect using MongoClient
MongoClient.connect(url, {
    db: { w:1, native_parser: false },
    server: {
        poolSize: 5,
        socketOptions: { connectTimeoutMS: 500 },
        auto_reconnect: true
    },
    replSet: {},
    mongos: {}
},
    function(err, db) {
    if( err ){
        console.log("Connection Failed via connection String.");
    }
    // Use the admin database for the operation
    var adminDb = db.admin();
    // List all the available databases
    adminDb.listDatabases(function(err, dbs) {
        test.equal(null, err);
        test.ok(dbs.databases.length > 0);
        db.close();
    });
});
    */

var MongoClient = require('mongodb').MongoClient;
var test = require('assert');

var url = 'mongodb://test@localhost:27017';

MongoClient.connect( url ,{
        db: { w:1, native_parser: false },
        server: {
            poolSize: 5,
            socketOptions: { connectTimeoutMS: 500 },
            auto_reconnect: true
        },
        replSet: {},
        mongos: {}
    },
    function(err, db ){
        if(err){
            console.log("Connection Failed via connection String.");
        }else{
            console.log("Connected via connectin string.");

            var adminDb = db.admin();

            /*
            // List all the available databases
            adminDb.listDatabases(function(err, dbs) {
                test.equal(null, err);
                test.ok(dbs.databases.length > 0);
                db.close();
            });
            */
        }

    } );
