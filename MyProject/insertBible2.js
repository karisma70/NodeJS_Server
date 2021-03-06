/**
 * Created by Administrator on 2017-05-23.
 */

var MongoClient = require('mongodb').MongoClient;
var bibleRead = require('./bibleRead2');

function addObject( collection, recordObj ){
    collection.insert( recordObj, function(err, result ){
        if(err){
            console.log("collection.insert Error!!!  : " + err );
            return false;
        }
    });
}

var insCount = 0;
var myDB = null;
var bibleChapterList = [];

function InsertRecordsToCollection(err, collection ){
    if( err ){
        console.log( "createCollection Error!!! " + err );
        return;
    }

    // bibleRead.readBibleText( 'data/new_hangul_bible_utf8.txt', function( rowObj ){
    bibleRead.readBibleText( 'data/hangul_bible_utf8.txt', function( rowObj ){
        if( rowObj ){
            addObject( collection, rowObj );
            insCount ++;
        } else{
            console.log("It's Error!!");
        }
    }, function( chapterList ){
        bibleChapterList = chapterList;

        myDB.dropCollection("bibleChapter", function(err, result ){
            if( err ){
                console.log( err );
            }else{
                console.log( "drop result : " + result );
            }

        });

        myDB.createCollection("bibleChapter", function( err, collection ){
            if( err ){
                console.log( "createCollection Error!!! " + err );
                return;
            }
             for( var idx in chapterList ){
                 var chapter = chapterList[idx];
                 addObject( collection, chapter );
                 console.log( chapter.bookNumber + ", " + chapter.title + ": " + chapter.lastNum );
             }
        });

        // myDB.close();
        console.log("Complete Insert!!! db.close() insert Count : " + insCount );
    } );
}



MongoClient.connect( "mongodb://bibleAdmin:daejin70@localhost:1001/bible_service", function(err, db){

    if( err ){
        console.log( "Connect to mongodb fail!!! " + err );
        return;
    }

    console.log("Success authenticate!! ");

    myDB = db.db("bible_service");
    if( myDB ){
        console.log("db is exist");

        myDB.dropCollection("bible2", function(err, result ){
            if( err ){
                console.log( err );
            }else{
                console.log( "drop result : " + result );
            }

        });

        myDB.createCollection("bible2",  InsertRecordsToCollection );


        setTimeout( function(){
            db.close();
            // console.log(" db.close() insert Count : " + insCount );
        }, 30000 );

    }
} );
/**
 * Created by Administrator on 2017-07-13.
 */
