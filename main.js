var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

var queues = {};

app.get('/sub/:queue', function (req, res){
    res.setHeader('Content-Type', 'text/html');
    res.write(" ");
    res.flushHeaders();
    var loop = setInterval(function(){
        res.write(" ");
        res.flushHeaders();
    },1000);
    if (queues[req.params.queue]==null) {
        queues[req.params.queue] = [];
    }
    var connectionObj = {
        res:res,
        loop:loop
    };
    queues[req.params.queue].push(connectionObj);
    var handleDisconnect = function(){
        var idx = queues[req.params.queue].indexOf(connectionObj);
        if (idx!=-1) {
            clearInterval(queues[req.params.queue][idx].loop);
            queues[req.params.queue].splice(idx,1);
        }
    };
    req.socket.on('close', handleDisconnect);
    req.socket.on('error', handleDisconnect);
    req.socket.on('end', handleDisconnect);
    req.socket.on('timeout', handleDisconnect);
});
app.get('/pub/:queue/:data', function (req, res){
    if (queues[req.params.queue]==null) {
        queues[req.params.queue] = [];
    }
    for (var i = 0; i < queues[req.params.queue].length; i++) {
        console.log("connection: "+i);
        queues[req.params.queue][i].res.write(JSON.stringify({
            data:req.params.data
        }));
        if (req.params.data=="end") {
            clearInterval(queues[req.params.queue][i].loop);
            queues[req.params.queue][i].res.end();
            var idx = queues[req.params.queue].indexOf(connectionObj);
            queues[req.params.queue].splice(i,1);
        }
    }
    res.send(JSON.stringify({
        status:"OK"
    }));
});

app.listen(app.get('port'), function(){
    console.log('Running on port: '+app.get('port'));
});