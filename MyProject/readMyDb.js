/**
 * Created by Administrator on 2018-05-27.
 */
/**
 * Created by david on 2017-04-07.
 */

var MongoClient = require('/usr/lib/node_modules/mongodb').MongoClient;
// var MongoClient = require('mongodb').MongoClient;

// in linux remote
// var MongoClient = require('/usr/lib/node_modules/mongodb').MongoClient;
// in windows local
// var MongoClient = require('C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\mongodb').MongoClient;
console.log("mongoClient is valid!!!" + MongoClient.name );
var myDB = null;

 MongoClient.connect( "mongodb://localhost:20001", function(err, db){
// MongoClient.connect( "mongodb://mydb:daejin70@localhost:20001/mydb", function(err, db){
//  MongoClient.connect( "mongodb://bibleAdmin:daejin70@52.78.152.6:20001/bible_service", function(err, db){
    console.log("Connect Success!!" );
    myDB = db;
    var dbo = db.db("mydb");
    dbo.collection("customers", function(err, bible ){
        // bible.find( { }, function( err, items ){
         bible.find().sort( { 'order':1 }).toArray( function( err, items ){
            console.log("----------------------------------");

             if( err )
                 console.log( err );

             if( items.length > 0  )
             {
                 var idx = 0;
                 for( idx = 0; idx < items.length; idx ++ )
                     console.log( JSON.stringify(items[idx]) );
             }

        });   // end of toArray

    });    // end of collection


    setTimeout( function(){
        // db.close();
        if( myDB != null ) {
            myDB.close();
            console.log("myDB.close() ");
        }
    }, 3000 );


} );

