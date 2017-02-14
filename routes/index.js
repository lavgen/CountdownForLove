var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
  // res.render(index, title:{'express'});
});

/* GET Hello World page. */
router.get('/1', function(req, res) {
    
    var db = req.db;
    console.log(db);
    var collection = db.get('users');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "users" : docs
        });
    });
    res.render('index');
});

module.exports = router;

/* GET Userlist page. */
/* GET Userlist page. */
router.get('/userlist', function(req, res) {
   
});