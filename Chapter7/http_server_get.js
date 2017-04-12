/**
 * Created by david on 2017-03-23.
 */

var http = require('http');
var messages = [
        'Hello World',
        'From a basic Node.js server',
        'Take Luck'
    ];

http.createServer( function (req, res){
    res.setHeader("Content-Type", "text/html");
    res.writeHead( 200 );
    res.write('<html>\n<head>\n<title>Simple \n</title>\n</head>\n');
    res.write('<body>\n');
    for( var idx in messages){
        res.write('\n<h1>' + messages[idx] + '</h1>');
    }
    res.end('\n</body>\n</html>');
}).listen(8081);

