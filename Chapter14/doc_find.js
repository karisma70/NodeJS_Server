/**
 * Created by david on 2017-04-07.
 */

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect( "mongodb://localhost:27017", function(err, db){
    var myDB = db.db("astro");
    myDB.collection("nebulae", function(err, nebulae){
        nebulae.find( function( err, items ){
            console.log("----------------------------------");
            items.toArray( function(err, itemArr){
                console.log("Document Array : ");
                console.log( itemArr );
            } );
       });   // end of nebulae.find


       nebulae.find( function( err, items ){
           console.log("----------------------------------");
           items.each( function( err, item ){
               if( item ){
                   console.log("Singular Document: ");
                   console.log(item);
               }
           } );
       } );      // end of nebulae.find

        /*
        nebulae.findOne( { type: "platetary" }, function(err, item ){
            console.log("----------------------------------");
           console.log(" Found one : ");
           console.log(item);
            console.log("item.type : " + item.type );
       }) ; */

        nebulae.find( { location : "Draco" } ).toArray( function(err, itemArr) {
            for( var i = 0; i < itemArr.length; i ++ ){
                console.log( itemArr[i] );
            }
        });

    });

    setTimeout( function(){
        db.close();
    }, 3000 );
} );
