/**
 * Created by david on 2017-04-04.
 */

var MongoClient = require('mongodb').MongoClient;

console.log("ready connect to mongodb")

MongoClient.connect('mongodb://test@localhost:27017',{
//MongoClient.connect('mongodb://astro@localhost',{
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
        db.logout(function(err, result){
           if( !err ){
               console.log("Logged out via connectino string...");
           }
           db.close();
           console.log("Connection closed ... ");
        });
    }

} );
