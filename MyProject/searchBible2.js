/**
 * Created by Administrator on 2017-07-13.
 */
/**
 * Created by Administrator on 2017-05-24.
 */

var http = require('http');
var url = require('url');

var  searchDB = (function() {
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

    function SearchBibleText( param, callback ) {
        if( bibleDB == null ){
            console.log( "bibleDB is not valid!!");
            return;
        }

        /*
        bibleDB.collection("bible2", function (err, bible) {
            bible.find( param.option, callback);
        });
        */

        bibleDB.collection("bible2", function (err, bible) {
            bible.find( param.option).sort( {'paragraph': 1}, callback );
        });


    }

    function SearchPoi( param, callback ){
        if( bibleDB == null ){
            console.log( "bibleDB is not valid!!");
            return;
        }

        if( param.type == "Poi") {
            bibleDB.collection("poi_info", function( err, poi){
                poi.find( param.option, callback );
            })
        }
    }

    return {
        connect : function(){
            MongoClient.connect("mongodb://bibleAdmin:daejin70@localhost:1001/bible_service", callbackDB );
        },
        SearchBibleText : SearchBibleText,
        SearchPoi: SearchPoi,
        close : function(){
            setTimeout(function () {
                bibleDB.close();
                console.log("db.close() ");
            }, 3000);
        }
    }

}());

searchDB.connect();


function sendNoResponse( response ){
    response.writeHead(200, {
        'Content-Length': "100",
        'Content-Type' : 'text/html',
        'Access-Control-Allow-Origin': 'http://13.124.86.217'
    });
    response.end( null );
}

function searchPOI( searchParam, response ){
    searchDB.searchPoi( searchParam, function(err, items){
        if( err ){
            console.log("searchPOI() record fetch Error!!! " + err);
            console.log(JSON.stringify(err));
            response.writeHead(404, {
                'Access-Control-Allow-Origin': 'http://13.124.86.217'
            });
            response.end(JSON.stringify(err));
            return;
        }

        items.toArray( function(err, itemArr){
            if( err ){
                console.log( "Error!!! SearchBibleText() items.toArray : " + err );
                return;
            }

            response.writeHead( 200, {
                // 'Content-Length': content.length,
                'Content-Type': 'text/html',
                'Access-Control-Allow-Origin': 'http://13.124.86.217'
            });
            response.end(JSON.stringify(itemArr));
        });

    } );
}

function searchBibleTextProc( searchParam, response) {

    // searchDB.search({title: "창세기", chapter: "1", paragraph: "1"}, function (err, items) {
    searchDB.SearchBibleText( searchParam, function (err, items) {
        if (err) {
            console.log("searchBibleTextProc() record fetch Error!!! " + err);
            console.log(JSON.stringify(err));
            response.writeHead(404, {
                'Access-Control-Allow-Origin': 'http://13.124.86.217'
            });
            response.end(JSON.stringify(err));
            return;
        }

        items.toArray( function(err, itemArr){
            if( err ){
                console.log( "Error!!! SearchBibleText() items.toArray : " + err );
                return;
            }

            if( itemArr.length < 2500 ) {
                response.writeHead(200, {
                    // 'Content-Length': content.length,
                    'Content-Type': 'text/html',
                    'Access-Control-Allow-Origin': 'http://13.124.86.217'
                });
                response.end(JSON.stringify(itemArr));
            }else{      // 데이터 길이가 너무 커서 못보낼 경우
                console.log( "Data length is too long , whole record count : " + itemArr.length );
                response.writeHead(200, {
                    // 'Content-Length': content.length,
                    'Content-Type': 'text/html',
                    'Access-Control-Allow-Origin': 'http://13.124.86.217'
                });

                var resText = {
                    result : "fail",
                    error: "Data length is too long!! recored count :" + itemArr.length
                };
                response.end( JSON.stringify(resText)  );
            }
        });
    });
}

function searchPoiProc( searchParam, response ){
    searchDB.SearchPoi( searchParam, function(err, items){
        if (err) {
            console.log("record fetch Error!!! " + err);
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

            response.writeHead(200, {
                // 'Content-Length': content.length,
                'Content-Type': 'text/html',
                'Access-Control-Allow-Origin': 'http://13.124.86.217'
            });
            response.end(JSON.stringify(itemArr));
        });
    } );
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
            var searchParam = JSON.parse( reqData );
            if( searchParam.type == "Args" || searchParam.type == "Word" ) {
                searchBibleTextProc(searchParam, response);
            } else if( searchParam.type == "Poi" ){
                searchPoiProc( searchParam, response );
            }
        });
    } else {
        console.log( "url : " + urlObj.pathname );
        sendNoResponse( response );
        return;
    }
};


http.createServer( callbackServer ).listen( 8083 );
