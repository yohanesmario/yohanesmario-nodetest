var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

var queues = {};

app.get('/sub/:queue', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    var loop = setInterval(function(){
        res.write(" ");
        res.flushHeaders();
    },3000);
    if (queues[req.params.queue]==null) {
        queues[req.params.queue] = [];
    }
    queues[req.params.queue].push({
        res:res,
        loop:loop
    });
});
app.get('/pub/:queue/:data', function (req, res) {
    if (queues[req.params.queue]==null) {
        queues[req.params.queue] = [];
    }
    for (var i = 0; i < queues[req.params.queue].length; i++) {
        queues[req.params.queue][i].res.write(JSON.stringify({
            data:req.params.data
        }));
        if (req.params.data=="end") {
            clearInterval(queues[req.params.queue][i].loop);
            queues[req.params.queue][i].res.end();
        }
    }
    res.send(JSON.stringify({
        status:"OK"
    }));
});

app.listen(app.get('port'), function(){
    console.log('Running on port: '+app.get('port'));
});