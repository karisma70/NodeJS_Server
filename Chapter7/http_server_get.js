/**
 * Created by david on 2017-03-23.
 */

var http = require('http');
var url = require('url');

var messages = [
        'Hello World',
        'From a basic Node.js server',
        'Take Luck'
    ];

http.createServer( function (request, response){

    var urlObj = url.parse( request.url, true, false );     // url을 파싱
    console.log( "url : " + urlObj.pathname );

    //res.setHeader("Content-Type", "text/html");
    response.writeHead( 200, {
        "Content-Type" : "text/html",
        'Access-Control-Allow-Origin': 'http://13.124.86.217'
    });
    response.write('<html>\n<head>\n<title>Simple \n</title>\n</head>\n');
    response.write('<body>\n');
    for( var idx in messages){
        response.write('\n<h1>' + messages[idx] + '</h1>');
    }
    response.end('\n</body>\n</html>');
}).listen(8081);

