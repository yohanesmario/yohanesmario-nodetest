var https = require('https');
var stream = "";

https.get('https://yohanesmario-nodetest.herokuapp.com/sub/test', function(res) {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', function(d) {
        stream+=d;
        stream = stream.trim();
        console.log(JSON.parse(stream));
    });

}).on('error', function(e) {
    console.error(e);
});