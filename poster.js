var https = require('https');
var postData = JSON.stringify({
    'msg' : 'Hello World!'
});

var options = {
    hostname: 'yohanesmario-nodetest.herokuapp.com',
    port: 443,
    // hostname: 'localhost',
    // port: 5000,
    path: '/topic/test',
    method: 'POST',
    headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Length': Buffer.byteLength(postData)
    }
};

var req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
        console.log('No more data in response.');
    });
});

req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();