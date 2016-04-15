var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {   
  	res.render('contact/index', { title: 'Phonebook' });
});
// Save contact 
router.post('/store', function(req, res, next) {   
 	res.json(req.body);
});

// show contact 
router.get('/:id', function(req, res, next) { 
    
 	res.json(req.params);
});

// Update contact 
router.put('/:id', function(req, res, next) {
    req.body.id = req.params.id;     
 	res.json(req.body);
});

// Delete contact 
router.delete('/:id', function(req, res, next) {   
  res.json(req.params);
});

module.exports = router;
