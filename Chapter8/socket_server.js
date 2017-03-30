/**
 * Created by david on 2017-03-27.
 */
var g_port = 8081;
var g_net = require('net');

var g_server = g_net.createServer( client_callback );

//var client_callback = function( socket ){
function  client_callback( socket ){
    console.log('Client connection');
    console.log(' local = %s:%s', socket.localAddress, socket.localPort);
    console.log(' remote = %s:%s ', socket.remoteAddress, socket.remotePort );

    socket.setTimeout(500);
    socket.setEncoding('utf8');

    // socket.write("Type 'quit' to exit. \n");

    socket.on('data', function(data){
        console.log('*event: Received data from socket on port %d : %s ', socket.remotePort, data.toString() );
        console.log(' Bytes received: ' + socket.bytesRead);
        writeData( socket, 'Sending : ' + data.toString());
        // socket.write("Sending : Receved Data OK!!! ");
        var text = "david!!!"
        var sendMsg = "Sending :  " + text.toString();
        // console.log( sendMsg );
        // socket.write( sendMsg.toString() );
        // console.log("*Send Msg => " + sendMsg.toString());
        console.log(' Bytes sent : ' + socket.bytesWritten);
    });

    socket.on('end', function(){
        console.log( '*event: Client disconnectd');
        g_server.getConnections( function(err, count){
            console.log('Remaining Connections : ' + count );
        });
    });

    socket.on('error', function(err){
        console.log( '*event: Socket Error : ', JSON.stringify(err));
    });

    socket.on('timeout', function(){
        console.log('*event: Socket Time out');
    });
};


g_server.listen( g_port, function(){
    // console.log('Server listening: ' + JSON.stringify( g_server.address() ));
    g_server.on('close', function(){
       console.log('*event: Server Terminated');
    });
    g_server.on('error', function(err){
       console.log('*event: Server Error: ', JSON.stringify(err));
    });
});

g_server.on('listening', function(){
   console.log('*event: Server listening: ' + JSON.stringify( g_server.address() ));
});

g_server.on('connection', function(socket){
   console.log('*event: Server has a new connection') ;
    // socket.end();
    // socket.close();
});

g_server.on('close', function(){
    console.log('*event: Server is now closed') ;
});

g_server.on('error', function(){
   console.log('*event: Error occured : ', err.message );
});


function writeData(socket, data){
    var success = !socket.write(data);
    if( !success) {
        console.log( "It's not success !! recall writeData() " + data  );
        (function (socket, data) {
            socket.once('drain', function () {
                writeData(socket, data);
            });
        })(socket, data);
    }
    else
        console.log( "It's success !! " + data  );
}

