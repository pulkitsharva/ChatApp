var express = require('express');
var router = express.Router();
var app=express();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.get('/client1', function(req, res) {
	console.log("session:"+req.session.user);
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
router.post('/checkUser', function(req, res) {
	var db=req.db;
	var collection=db.get('userNameCollection');
		console.log("going to execute query:"+req.body.userName);
		collection.find({"user":{ "$regex" : req.body.userName, "$options" : "-i" }},{},function(e,list)
		{
			if(list.length>=1)
			{
				console.log("user name not available");
				res.header("Access-Control-Allow-Origin", "*");
				res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,    Accept");
				res.send({"message":"user name not available"});
				
			}
			else
			{
				req.session.user="some value saved";
				console.log("user name available");
				res.header("Access-Control-Allow-Origin", "*");
				res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,    Accept");
				res.send({"message":"user name available"});
				console.log(req.session);
				
			}
			if(e)
			{
				console.log("some error is coming up");
			}
		});
});


module.exports = router;
