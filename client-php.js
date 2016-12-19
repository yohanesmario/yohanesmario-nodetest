var http = require('http');
var stream = "";
var host = 'http://yohanesmario.com/pubsub/?topic=test';

var sendData = function(topic,data) {
    var options = {
        hostname: 'yohanesmario.com',
        port: 80,
        // hostname: 'localhost',
        // port: 5000,
        path: '/pubsub/?topic='+topic,
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    var req = http.request(options, (res) => {
        res.setEncoding('utf8');
    });

    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
    });

    // write data to request body
    req.write(data);
    req.end();
};

http.get(host, function(res) {
    res.on('data', function(d) {
        stream+=d;
        stream = stream.trim();
        try {
            var data = JSON.parse(stream);
            stream = "";
            console.log(data);
            var jsonData = JSON.parse(data.data);
            sendData(jsonData.topic, "PONG");
        } catch (e) {
            // console.log("HEARTBEAT", Date.now());
        }
    });

}).on('error', function(e) {
    console.error(e);
});