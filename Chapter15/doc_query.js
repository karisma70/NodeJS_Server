/**
 * Created by Administrator on 2017-04-12.
 */
// book 326-327 page

// mongodb 에서의 쿼리문 예
    //  db.getCollection('word_stats').find({first : {$in: ['a', 'b', 'c' ]}});

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://13.124.86.217:27017", function(err, db ){
    var myDB = db.db("words");
    myDB.collection("word_stats", findItems );
    setTimeout( function(){
       db.close();
    }, 3000);
} );

function displayWords( msg, cursor, pretty ){
    cursor.toArray( function(err, itemArr ){
        console.log("\n" + msg + " count : " + itemArr.length );
        var wordList = [];
        for( var i = 0; i < itemArr.length; i++ ){
            wordList.push( itemArr[i].word );
        }

        console.log(JSON.stringify(wordList, null, pretty));
    });
}

function findItems( err, words ){
    words.find( { first : {$in: ['a', 'b', 'c' ]}}, function( err, cursor ){        // first 필드에 a, b, c, 문자가 있는 레코드 검색
        displayWords( "1. Words starting with a, b or c: ", cursor );
    });

    words.find( { size: {$gt: 12 }}, function( err, cursor ){                       // size 필드가 12 이상인 레코드 검색
        displayWords("2. Words longer than 12 characters: ", cursor );
    });

    words.find( { size: {$mod: [2, 0] } }, function( err, cursor ){                 // size 필드가 짝수개인 레코드 검색
       displayWords("3. Words with even Lengths : ", cursor );
    });

    words.find( { letters: {$size: 10}}, function( err, cursor){                    //
       displayWords("4. Words with 10 Distinct characters: ", cursor );
    });

    words.find( { $and : [ {first: {$in: ['a', 'e', 'i', 'o', 'u' ]}},
                            {last: {$in: ['a', 'e', 'i', 'o', 'u']}} ] },
       function( err, cursor ){
       displayWords("5. Words that start and end with a vowel : ", cursor );
    });

    words.find( { "stats.vowels" : {$gt:5 }}, function(err, cursor){
        displayWords("6. Words containing 6 or more vowels: ", cursor );
    });

    words.find( {letters: { $all : ['a', 'e', 'i', 'o', 'u']}}, function(err, cursor){
        displayWords("7. Words with all 5 vowels: ", cursor );
    });

    words.find( {otherChars: {$exists: true }}, function(err, cursor){      // 알파벳 문자가 아닌 레코드 검색
        displayWords("8. Words with non-alphabet characters: ", cursor);
    });

    words.find( {charsets: {$elemMatch: { $and: [ {type: 'other'}, {chars:{$size:2}} ] }}}, // charset 필드의 하위 필드 검색을 위한 elemMatch 사용, and 연산자는 type 필드가 'other' 문자와 일치하고 chars 배열 크기가 2인 레코드 검색
       function(err, cursor) {
        displayWords("9. Words with 2 non-alphabet characters: ", cursor);
    });
}