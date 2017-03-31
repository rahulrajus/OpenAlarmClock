var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');
var path = require('path')
var five = require('johnny-five')
var board = new five.Board({port: "COM5"});
board.on("ready", function() {
  // var led = new five.Led(13);
  // led.blink(100);
  var button5 = new five.Button(5);
  var button4 = new five.Button(4);
  var button11 = new five.Button(11);
  var a_hr = 12
  var a_min = 0
  var a_toggle = -1

  button5.on("press", function() {
    console.log( "Button5 pressed" );
    if(a_toggle == 1)
    {
      a_hr+=1
      a_hr = a_hr%12
      io.sockets.emit("a_hr",{"a_hr":a_hr})
    }

  });
  button4.on("press", function() {
    console.log( "Button4 pressed" );
    if(a_toggle == -1)
    {
    io.sockets.emit("a_alarm")
    a_toggle = 1;
    }
    else {
      io.sockets.emit("a_clock")
      a_toggle = -1;
    }
  });
  button11.on("press", function() {
    console.log( "Button11 pressed" );
    if(a_toggle == 1)
    {
      a_min+=1
      a_min = a_min%60
      io.sockets.emit("a_min",{"a_min":a_min})
    }
  });
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
  // socket.emit('news', { hello: 'world' });
  console.log("connection!")
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
