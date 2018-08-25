var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(4000, function(){
  console.log('Listening port 4000');
});

app.set('port', process.env.PORT || 8080)

var io = socket(server);

io.on('connection', function(socket){
  console.log('user connected');

  socket.join(socket.request._query.order);
  io.to(socket.request._query.order).emit('Joined!');

  socket.on('new_message', function(){
    io.to(socket.request._query.order).emit('new_message');
    console.log(socket.request._query.order + ' message')
  });

  socket.on('disconnect', function(){
    console.log('user disconnected')
  });
});
