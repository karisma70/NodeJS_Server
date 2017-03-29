/**
 * Created by david on 2017-03-22.
 */
var fs = require('fs');
var http = require('http');
var url = require('url');

var ROOT_DIR = "html/";
http.createServer( function(req, res){
    var urlObj = url.parse( req.url, true, false );     // url을 파싱
    fs.readFile(ROOT_DIR + urlObj.pathname, function(err, data){
        if( err ){
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
} ).listen(8081);       // 8081 포트를 열고 대기한다.
