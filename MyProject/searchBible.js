/**
 * Created by Administrator on 2017-05-24.
 */

var http = require('http');
var url = require('url');

var  searchBible = (function() {
    var bibleDB = null;
    var MongoClient = require('mongodb').MongoClient;

    function callbackDB( err, db ){
        if (err) {
            console.log("Fail!!! Connect to mongodb : " + err);
            return;
        }

        console.log("Success authenticate!! ");

        bibleDB = db.db("bible_service");
        if ( bibleDB) {
            console.log("bibleDB is ready!!");
        }
    }

    function Search( option, callback ) {
        if( bibleDB == null ){
            console.log( "bibleDB is not valid!!");
            return;
        }
        bibleDB.collection("bible", function(err, bible) {
            bible.find( option, callback );
        } );
    }

    return {
        connect : function(){
            MongoClient.connect("mongodb://bibleAdmin:daejin70@localhost:1001/bible_service", callbackDB );
        },
        search : Search,
        close : function(){
            setTimeout(function () {
                bibleDB.close();
                console.log("db.close() ");
            }, 3000);
        }
    }

}());

searchBible.connect();


function sendNoResponse( response ){
    response.writeHead(200, {
        'Content-Length': "100",
        'Content-Type' : 'text/html',
        'Access-Control-Allow-Origin': 'http://13.124.86.217'
    });
    response.end( null );
}

function searchAndSendData( searchOption, response) {

    // searchBible.search({title: "창세기", chapter: "1", paragraph: "1"}, function (err, items) {
    searchBible.search( searchOption, function (err, items) {
        if (err) {
            console.log("recored fetch Error!!! " + err);
            console.log(JSON.stringify(err));
            response.writeHead(404, {
                'Access-Control-Allow-Origin': 'http://13.124.86.217'
            });
            response.end(JSON.stringify(err));
            return;
        }

        items.toArray( function(err, itemArr){
            if( err ){
                console.log( "items.toArray : " + err );
                return;
            }
            console.log("Document Array : ");
            console.log( JSON.stringify(itemArr));

            response.writeHead(200, {
                // 'Content-Length': content.length,
                'Content-Type': 'text/html',
                'Access-Control-Allow-Origin': 'http://13.124.86.217'
            });

            response.end(JSON.stringify( itemArr ));
        });

    });
}


var callbackServer = function(request, response){
    var urlObj = url.parse( request.url, true, false );     // url을 파싱
    var reqData = '';

    if( request.method == "HEAD"){
        sendNoResponse( response );
        return;
    } else if(request.method == "POST"){
        request.on('data', function(chunk){
            reqData += chunk;
        });
        request.on('end', function(){
            console.log( reqData );
            var searchOpt = JSON.parse( reqData );
            searchAndSendData( searchOpt, response);
        });
    } else {
        console.log( "url : " + urlObj.pathname );
        sendNoResponse( response );
        return;
    }
};


http.createServer( callbackServer ).listen( 8082 );
