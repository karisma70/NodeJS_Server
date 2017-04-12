/**
 * Created by david on 2017-04-03.
 */
var MongoClient  = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
//var client = new MongoClient( new Server('127.0.0.1', 27017, { socketOptions: { connectTimeoutMS : 500 },
var client = new MongoClient( new Server('13.124.86.217', 27017, { socketOptions: { connectTimeoutMS : 500 },
                                                                poolSize: 5,
                                                                auto_reconnect : true},
                                                               { numberOfRetries: 3,
                                                                 retryMilliSeconds : 500 }) );

console.log("mongodb is connected 127.0.0.1 !!! ");

client.open( function( err, client ){

    console.log("client.open() ---> ")

   if( err ){
       console.log("connection Failed via client object!!!");
   } else {
       var db = client.db("test");
       if( db ){
           console.log("Connected via Client Object... ");
           db.authenticate("nodeuser", "daejin70", function (err, results) {
               if (err) {
                   cnosole.log("Authentication failed !!!! ");
                   client.close();
                   console.log("Connection closed .... ");
               } else {
                   console.log("Success!!! Authenticated via client object of nodeuser ");
                   db.logout(function (err, result) {
                       if (!err) {
                           console.log("Success!!! Logged out via client object nodeuser ");
                       }
                       client.close();
                       console.log("connection closed");
                   });  // .logout
               }    // else
           });
       }    // if( db )
   }
    db.close();
    console.log("db.close() ");
});

console.log("client.open end exit !! ");