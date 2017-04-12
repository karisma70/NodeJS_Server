/**
 * Created by david on 2017-03-22.
 */
var fs = require('fs');
var http = require('http');
var url = require('url');

var ROOT_DIR = "html/";

var callbackServer = function(request, response){
    var urlObj = url.parse( request.url, true, false );     // url을 파싱
    fs.readFile(ROOT_DIR + urlObj.pathname, function(err, data){
        if( err ){
            console.log( JSON.stringify(err));
            response.writeHead(404);
            response.end(JSON.stringify(err) + " ==> cannot find file !! : " + urlObj.pathname );
            return;
        }
        else {
            response.writeHead(200);
            response.end(data);
            console.log("Success!! " + (ROOT_DIR + urlObj.pathname) + " is sending OK!!" );
        }
    });
}


http.createServer( callbackServer ).listen( 8081 );
