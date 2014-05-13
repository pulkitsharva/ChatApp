var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.get('/client1', function(req, res) {
  res.render('client1', { title: 'Express' });
});
router.get('/client2', function(req, res) {
  res.render('client2', { title: 'Express' });
});
router.get('/client3', function(req, res) {
  res.render('client3', { title: 'Express' });
});
module.exports = router;
