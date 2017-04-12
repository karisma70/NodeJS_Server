/**
 * Created by david on 2017-04-06.
 */

// doc_add.js

var MongoClient = require('mongodb').MongoClient;

function addObject( collection, object ){
    collection.insert( object, function(err, result ){
       if(err){
           console.log("collection.insert Error!!!  : " + object );
           return;
       }

       console.log("Inserted : " + result );
    });
}


// mongodb://test@localhost:27017
MongoClient.connect( "mongodb://localhost:27017", function(err, db){
    var myDB = db.db("astro");      // astro db가 없느면 생성하고 있으면 접속한다.
    myDB.dropCollection("nebulae");
    myDB.createCollection("nebulae", function(err, ins_obj ){
        addObject( ins_obj, { ngc: "NGC 7293", name : "Helix", type: "platetary", location: "Aquila"} );
        addObject( ins_obj, { ngc: "NGC 6543", name : "Cat's Eye", type: "platetary", location: "Draco"} );
        addObject( ins_obj, { ngc: "NGC 1592", name : "Crab", type: "supernova", location: "Taurus"} );

        console.log("success !!  insert of 3 records");
    })

    setTimeout( function(){
        db.close();
        console.log(" db.close() <-----")
    }, 3000 );
} );
