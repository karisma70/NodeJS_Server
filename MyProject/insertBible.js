/**
 * Created by Administrator on 2017-05-23.
 */

var MongoClient = require('mongodb').MongoClient;
var bibleRead = require('./bibleRead');

function addObject( collection, recordObj ){
    collection.insert( recordObj, function(err, result ){
        if(err){
            console.log("collection.insert Error!!!  : " + err );
            return false;
        }
    });
}

var insCount = 0;


function InsertRecordsToCollection(err, collection ){
    if( err ){
        console.log( "createCollection Error!!! " + err );
        return;
    }

    bibleRead.readBibleText( 'data/hangul_bible_utf8.txt', function( rowObj ){
        if( rowObj ){
            addObject( collection, rowObj );
            insCount ++;
        }
    });
}

MongoClient.connect( "mongodb://bibleAdmin:daejin70@localhost:1001/bible_service", function(err, db){

    if( err ){
        console.log( "Connect to mongodb fail!!! " + err );
        return;
    }

    console.log("Success authenticate!! ");

    var myDB = db.db("bible_service");
    if( myDB ){
        console.log("db is exist");

        myDB.dropCollection("bible", function(err, result ){
            if( err ){
                console.log( err );
            }else{
                console.log( "drop result : " + result );
            }

        });

        myDB.createCollection("bible",  InsertRecordsToCollection );

        setTimeout( function(){
            db.close();
            console.log(" db.close() insert Count : " + insCount );
        }, 10000 );
    }
} );
