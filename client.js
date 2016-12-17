var https = require('http');
var stream = "";

https.get('http://localhost:5000/sub/test', function(res) {
    res.on('data', function(d) {
        stream+=d;
        stream = stream.trim();
        try {
            var data = JSON.parse(stream);
            stream = "";
            console.log(data);
        } catch (e) {
            console.log("[heartbeat]");
        }
    });

}).on('error', function(e) {
    console.error(e);
});