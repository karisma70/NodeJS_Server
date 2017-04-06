/**
 * Created by david on 2017-04-03.
 */
var MongoClient  = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var client = new MongoClient( new Server('localhost', 27017, { socketOptions: { connectTimeoutMS : 500 },
                                                                poolSize: 5,
                                                                auto_reconnect : true},
                                                               { numberOfRetries: 3,
                                                                 retryMilliSeconds : 500 }) );

console.log("mongodb is installed!!! ");

client.open( function( err, client ){
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
});

