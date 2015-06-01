var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.send('index.html', { title: 'Christian Doan - Bob\'s got his toolbox out...' });
  res.send('index.html');
});

module.exports = router;
