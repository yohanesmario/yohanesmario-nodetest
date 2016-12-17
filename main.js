// var express = require('express');
// var app = express();
//
// app.set('port', (process.env.PORT || 5000));
//
// app.get('/', function (req, res) {
//   res.send('Running on port: '+app.get('port'));
// });
//
// app.listen(app.get('port'), function(){
//     console.log('Running on port: '+app.get('port'));
// });
var net = require('net');

var port = (process.env.PORT || 5000);

var server = net.createServer((socket) => {
  socket.end('Hello world!\n');
}).on('error', (err) => {
  // handle errors here
  throw err;
});

// grab a random port.
server.listen(port, () => {
  console.log('opened server on', server.address());
});