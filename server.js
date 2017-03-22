var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');
var path = require('path')
var five = require('johnny-five')
var board = new five.Board({port: "COM5"});
board.on("ready", function() {
  var led = new five.Led(13);
  led.blink(100);
});
app.use('/public', express.static(__dirname + '/public'));
// app.use(express.static(path.join(__dirname, 'public')));

app.listen(5000);

// function handler (req, res) {
//   fs.readFile(__dirname + '/index.html',
//   function (err, data) {
//     if (err) {
//       res.writeHead(500);
//       return res.end('Error loading index.html');
//     }
//
//     res.writeHead(200);
//     res.end(data);
//   });
// }
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  console.log("connection!")
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
