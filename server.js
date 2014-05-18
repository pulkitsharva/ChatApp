var path = require('path');
var http = require('http'),    express = require('express'),    faye = require('faye');
var bodyParser = require('body-parser');
var bayeux = new faye.NodeAdapter({
  mount:    '/faye',
  timeout:  45
});
var app = express();
var routes = require('./routes/index');
var server = http.createServer(app);
var mogno=require('mongodb');
var monk = require('monk');
var db = monk('pulkit:sharva@localhost:27017/ChatServerDB');

bayeux.attach(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set("newBayeux",bayeux);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next)
{
	req.db=db;
	next();
});
app.use('/', routes);

/*
app.post('/message', function(req, res) {
  bayeux.getClient().publish('/channel', {text: req.body.message});
  console.log("Posting message:"+req.body.message);
  res.send(200);
});
*/


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

server.listen(8123);
module.exports = app;


console.log("Server up and listening on port 8123")
