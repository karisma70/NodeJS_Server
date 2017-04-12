/**
 * Created by david on 2017-04-07.
 */

var MongoClient = require('mongodb').MongoClient;

//MongoClient.connect("mongodb://localhost:27017", function(err, db ){
MongoClient.connect("mongodb://13.124.86.217:27017", function(err, db ){
    var myDB = db.db("astro");
    myDB.collection( "nebulae", function(err, nebulae ){
        nebulae.find( { type : "platetary"}, function( err, items ){
            items.toArray( function(err, itemArr ) {
                console.log("Before Update");
                console.log( itemArr );

                if( itemArr.length < 1 ){
                    console.log(" search of type : platetary  result count : " + itemArr.legnth );
                    return ;
                }

                nebulae.update( { type : "platetary", $isolated: 1 },
                    { $set: { type : "Planetary" , updated: true }},
                    { upsert: false, multi: true, w: 1 },
                    function( err, results ){
                        if( err ){
                            console.log("Fail to update of db !!!");
                            db.close();
                            return;
                        }
                        nebulae.find( { type : "Planetary"}, function( err, items ){
                            items.toArray( function(err, itemArr ){
                                console.log("---------------------------------------------------");
                                console.log("After Update : ");
                                console.log(itemArr );
                                db.close();
                            });
                        } );
                    } );
            });
        } );
    });
});

