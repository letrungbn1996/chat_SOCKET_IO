var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 1996;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.username = "Anonymous";
  socket.on('change_username', function(data){
    socket.username = data.username;
  })
  socket.on('new_message', function(data){
    io.emit('new_message', { message: data.message, username: socket.username });
  });

  socket.on('typing', data => {
    socket.broadcast.emit('typing', { username: socket.username });
  })
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
