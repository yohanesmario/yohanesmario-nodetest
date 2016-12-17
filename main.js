// var express = require('express');
// var app = express();
//
// function refresh
//
// app.set('port', (process.env.PORT || 5000));
//
// app.get('/', function (req, res) {
//
// });
//
// app.listen(app.get('port'), function(){
//     console.log('Running on port: '+app.get('port'));
// });

const http = require('http');

const port = (process.env.PORT || 5000);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n');
});

server.listen(port, () => {
  console.log('Server running at port ' + port);
});