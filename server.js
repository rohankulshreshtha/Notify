//This is the main file which listens to express on 8081 and sockets on 8080

//variable declaration
var express = require('express'),
    app = express(),
    client = require('socket.io').listen(8080).sockets,
    connections = [],       //to keep track of online users
    users = [],             //to keep track of names of users
    mongo = require( './db/mongo' ),
    db;

//connecting to the database
mongo.connectToServer( function( err ) {
    db = mongo.getDb();  //connecting to server
} );

//connecting to the server
var server = app.listen(8081, function () {
    var host = server.address().address,
        port = server.address().port;
    console.log("Node application listening at http://%s:%s", host, port);
})
   
   //defining the express routes
    app.use(express.static(__dirname + '/public'));

    app.get('/' , function(req,res){
        res.sendFile(__dirname + '/index.html');
    });

    var sock= require('/controller/sock');
    //this gets triggered as soon as user opens the page
    client.on('connection',function(socket){             
            //wait for login info 
            socket.on('input', sock.getInfo(connections,users,socket,data));

            //adding a new user
            socket.on('add_info', sock.addInfo(connections,users,socket,data));

            //updating the user and notifying the subscribed user
            socket.on('update_info',sock.updateInfo(connections,users,socket,data));

            //disconnecting user
            socket.on('disconnect', sock.disconnect(connections,users,socket,data));
         });
