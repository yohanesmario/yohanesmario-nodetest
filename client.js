var https = require('https');
var stream = "";

https.get('https://yohanesmario-nodetest.herokuapp.com/sub/test', function(res) {
    res.on('data', function(d) {
        stream+=d;
        stream = stream.trim();
        try {
            var data = JSON.parse(stream);
            stream = "";
            console.log(data);
        } catch (e) {
            
        }
    });

}).on('error', function(e) {
    console.error(e);
});