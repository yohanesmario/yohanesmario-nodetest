var https = require('https');
// var https = require('http');
var stream = "";
var host = 'https://yohanesmario-nodetest.herokuapp.com/topic/test';
// var host = 'http://localhost:5000/topic/test';

https.get(host, function(res) {
    res.on('data', function(d) {
        stream+=d;
        stream = stream.trim();
        try {
            var data = JSON.parse(stream);
            stream = "";
            console.log(data);
        } catch (e) {
            console.log("HEARTBEAT", Date.now());
        }
    });

}).on('error', function(e) {
    console.error(e);
});