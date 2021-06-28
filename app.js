var app = require('express')();
var http = require('http').Server(app);
var io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


var cors = require('cors');

  app.get('/', function(req, res) {
    console.log('wtf');

    res.setHeader('Accept', 'application/json');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1000000000");
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");

    res.sendfile('index.html');
  });

//app.use(); // add this line at appropriate place in your code 

  users = [];
 io.on('connection', function(socket) {
   console.log('A user connected');
   socket.on('setUsername', function(data) {
     console.log(data);

     if(users.indexOf(data) > -1) {
       socket.emit('userExists', data + ' username is taken! Try some');              
     } else {
       users.push(data);
       socket.emit('userSet', {username: data});
     }
   });

   socket.on('msg', function(data) {
     //Send message to everyone
     io.sockets.emit('newmsg', data);
   });
});

http.listen(3000, function() {
console.log('listening on localhost:3000');
});