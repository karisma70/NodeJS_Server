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
            response.writeHead(404, {
                'Access-Control-Allow-Origin': 'http://13.124.86.217'
            });
            response.end(JSON.stringify(err) + " ==> cannot find file !! : " + urlObj.pathname );
        }
        else {
            var fsState = fs.statSync(ROOT_DIR + urlObj.pathname);
            var stringSize = fsState.size;
            console.log( "file Size : " + stringSize );

            response.writeHead(200, {
                'Content-Length': stringSize,
                 'Content-Type' : 'text/html',
                  'Access-Control-Allow-Origin': 'http://13.124.86.217'
            });

            response.end(data);
            console.log("Success!! " + (ROOT_DIR + urlObj.pathname) + " is sending OK!!" );
        }
    });
}


http.createServer( callbackServer ).listen( 8082 );
