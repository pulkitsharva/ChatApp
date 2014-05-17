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
router.post('/checkUser', function(req, res) {

	console.log("checking user");
	var db=req.db;
	var collection=db.get('userNameCollection');
		console.log("going to execute query:"+req.body.userName);
		collection.find({"user":req.body.userName},{},function(e,list)
		{
			if(list.length==1)
			{
				console.log("user name not available");
			}
			else
			
			{
				console.log("user name available");
			}
			if (e) {
			console.log("error: "+e);
			}
		});
});

module.exports = router;
