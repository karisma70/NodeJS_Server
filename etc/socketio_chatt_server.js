/**
 * Created by david on 2017-03-29.
 * http://bcho.tistory.com/896
 */
var express = require('express');
var routes = require('routes');
var http = require('http');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

var httpServer =http.createServer(app).listen(8081, function( req, res ){
    console.log('Socket IO server has been started');
});
// upgrade http server to socket.io server
var io = require('socket.io').listen(httpServer);

var socketFunc = function( socket ){
    socket.emit('toclient',{ msg : 'connected to server.' });
    socket.on('fromclient',function(data){
        socket.broadcast.emit('toclient',data); // 자신을 제외하고 다른 클라이언트에게 보냄
        socket.emit('toclient',data); // 해당 클라이언트에게만 보냄. 다른 클라이언트에 보낼려면?
        console.log('Receive data from client :'+ data.msg);
    })
};

io.sockets.on('connection', socketFunc );



