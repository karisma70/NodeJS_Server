/**
 * Created by Administrator on 2017-05-23.
 */

var MongoClient = require('mongodb').MongoClient;
var chapterTitle = require('./chapterTitle');
var fs = require('fs');

function isNumber( str ) {
    str += ''; // 문자열로 변환
    str = str.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
    if (str == '' || isNaN(str))
        return false;
    return true;
}

function getRowContent( rowString ){
    chapterPos = rowString.indexOf(" ");

    if( chapterPos < 1 )
        return;

    var chapterText = rowString.substring( 0, chapterPos );
    var numberLoc = chapterText.indexOf( ":");

    var chapterNum = "";
    var shortTitle = "";

    for (var i = 0; i < numberLoc; i++) {
        var text = chapterText.charAt(i);
        if (isNumber(text))
            chapterNum += text;
        else
            shortTitle += text;
    }

    chapterNum = parseInt(chapterNum);
    chapterNum = chapterNum.toString();

    var paragraphNum = rowString.substring(numberLoc + 1, chapterText.length);
    paragraphNum = parseInt(paragraphNum);
    paragraphNum = paragraphNum.toString();

    var content = rowString.substring(chapterText.length+1, rowString.length);

    var chapterObj = chapterTitle.findByChar( shortTitle );

    if( chapterObj ) {
        return {
            shortTitle: shortTitle,
            title: chapterObj.name,
            chapter: chapterNum,
            paragraph: paragraphNum,
            content: content
        };
    }
    else{
        console.log( shortTitle + " is Error!!" );
        return null;
    }
}


function addObject( collection, recordObj ){
    collection.insert( recordObj, function(err, result ){
        if(err){
            console.log("collection.insert Error!!!  : " + err );
            return false;
        }

//        console.log("Inserted : " + result );
    });
}

var insCount = 0;


function InsertRecordsToCollection(err, collection ){
    if( err ){
        console.log( "createCollection Error!!! " + err );
        return;
    }

    fs.readFile( 'data/hangul_bible_utf8.txt', { encoding: 'utf8', flag: 'r' },  function( ferr, data) {
        if( ferr ) {
            console.log("Failed to open bible file!! " + ferr);
            return;
        }

        var bibleTextArray = data.split("\n");
        var rowCount = bibleTextArray.length;

        console.log("total bible row Count : " + rowCount );

        for( var row = 0; row < rowCount ; row ++ ) {
            var rowString = bibleTextArray[row];
            var rowObj = getRowContent(rowString);

            if( rowObj ) {
                addObject( collection, rowObj );
                insCount ++;
            }
        }

    } );

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
            }
        });

        myDB.createCollection("bible",  InsertRecordsToCollection );

        setTimeout( function(){
            db.close();
            console.log(" db.close() insert Count : " + insCount );
        }, 3000 );
    }
} );
