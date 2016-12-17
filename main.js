var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    var loop = setInterval(function(){
        res.write("longpolling ");
        res.flushHeaders();
    },1000);
    setTimeout(function(){
        clearInterval(loop);
        res.end("endlongpolling");
    },5000);
});

app.listen(app.get('port'), function(){
    console.log('Running on port: '+app.get('port'));
});