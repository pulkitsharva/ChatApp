var express = require('express');
var router = express.Router();
var app=express();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.get('/client1', function(req, res) {

  res.render('client1', { title: 'Express' , value: "Unique_Value"});
});
router.get('/client2', function(req, res) {
  res.render('client2', { title: 'Express' });
});
router.get('/client3', function(req, res) {
  res.render('client3', { title: 'Express' });
});
router.post('/message', function(req, res) {
	var bayeux = req.app.get("newBayeux");
  console.log("Posting message:"+req.body.message);
  
  console.log("Bayeux:"+bayeux.getClient());
  bayeux.getClient().publish('/channel', {text: req.body.message});
  res.send(200);
});
router.get('/checkUser', function(req, res) {

	console.log("checking user");
	var db=req.db;
	var collection=db.get('userNameCollection');
		console.log("going to execute query:"+req.body.userName);
		collection.find({"user":req.body.userName},{},function(e,list)
		{
			if(list.length==1)
			{
				console.log("user name not available");
				res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,    Accept");
res.json({"data":'all good'},200);
				
			}
			else
			{
					console.log("user name available");
					var message="{'data':'user name available'}";
					res.statusCode = 200;
					return res.send('Error 400: Post syntax incorrect.');
			}
			if(e)
			{
				console.log("some error is coming up");
			}
		});
});
router.post('/checkUser1', function(req, res) {
console.log("From request:"+JSON.stringify(req.body));
res.header("Access-Control-Allow-Origin", "*");

res.send({'data': 'some data is coming up'});
	
	
});
module.exports = router;
