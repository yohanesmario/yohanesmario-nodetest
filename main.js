var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.text({type:"*/*"}));

app.set('port', (process.env.PORT || 5000));

var queues = {};

app.get('/topic/:name', function (req, res){
    res.setHeader('Content-Type', 'text/html');
    res.write(" ");
    res.flushHeaders();
    var loop = setInterval(function(){
        res.write(" ");
        res.flushHeaders();
    },60000);
    if (queues[req.params.name]==null) {
        queues[req.params.name] = [];
    }
    var connectionObj = {
        res:res,
        loop:loop
    };
    queues[req.params.name].push(connectionObj);
    var handleDisconnect = function(){
        var idx = queues[req.params.name].indexOf(connectionObj);
        if (idx!=-1) {
            clearInterval(queues[req.params.name][idx].loop);
            queues[req.params.name].splice(idx,1);
        }
    };
    req.socket.on('close', handleDisconnect);
    req.socket.on('error', handleDisconnect);
    req.socket.on('end', handleDisconnect);
    req.socket.on('timeout', handleDisconnect);
});
app.post('/topic/:name', function (req, res){
    if (queues[req.params.name]==null) {
        queues[req.params.name] = [];
    }
    for (var i = 0; i < queues[req.params.name].length; i++) {
        console.log(req.body);
        queues[req.params.name][i].res.write(JSON.stringify({
            data:req.body
        }));
        if (req.body=="end") {
            clearInterval(queues[req.params.name][i].loop);
            queues[req.params.name][i].res.end();
            var idx = queues[req.params.name].indexOf(connectionObj);
            queues[req.params.name].splice(i,1);
        }
    }
    res.send(JSON.stringify({
        status:"OK"
    }));
});

app.listen(app.get('port'), function(){
    console.log('Running on port: '+app.get('port'));
});