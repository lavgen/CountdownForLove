
var express = require('express');
var server = express();
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var cors = require("cors");
var router = express.Router();

//global vars

var data;
var Schema;
var userSchema;
//user for schema
var user0;
var User;
var query;
var newDeadline;
var existingDeadline;
//submitted deadline from new user

//connect to database named countdown
mongoose.connect('mongodb://localhost:6666/countdown');
var db = mongoose.connection;
 
db.on('error', function (err) {
console.log('connection error', err);
});
db.once('open', function () {

console.log('MONGODB connected.');
});

//create new schema to use on model to insert
Schema = mongoose.Schema;
userSchema = new Schema({
name : String,
date : Date,
isWritten : Boolean
}, {collection: 'users'});

// first arg:name of schema second:schema template
User = mongoose.model('User', userSchema);
// 	// this sets up the type of templating engine to use ( in this case hogan-express )
// 	// other examples are jade, handlebars, mustache, etc.
server.use(express.static(__dirname+'/public'));
	server.engine('html', require('hogan-express'));
	server.set('views', __dirname+ '/views'); // set the folder where the views ( ie. template files ) are in
	server.set('view engine', 'html'); 
server.use(bodyParser.urlencoded({ extended: true }))
// parse application/json 
server.use(bodyParser.json());
// parses request cookies, populating
// req.cookies and req.signedCookies
// when the secret is passed, used 
// for signing the cookies.
// must use cookieParser before expressSession
server.use(cookieParser());
server.get('/l', function(req,res){
	res.render('countdown');
});
	server.use(expressSession({secret:'somesecrettokenhere'}));
server.get('/', function(req, res){
  var html = '<form action="/" method="post">' +
             '<input type="text" placeholder="Username for you&Your&#x2665;" name="userName" style="margin-top: 20%; font-size:15px; width:80%;">' +
             '<input type="date" placeholder="Special date to countdown:* " name ="enteredDate" style="font-size:15px; width:80%;"   >' +
             '<button type="submit" onclick="loadReq();">Submit</button>' +
             '</form>'+
             '<form action="/" method="POST">' + 
			 '<input type="text" style="margin-top: 0%; font-size:15px; width:80%;" placeholder="Username:* " name="userName" >' +
			 '<button  name="submitButton" onclick="loadReq(); type="submit" onclick="showHide(); loadReq();"> Enter Username</button>' +
			 '</form>'
             ;
  	//this is a function with callback 
	User.findOne({'name': req.session.userName}, function(err, exist) {
	console.log('searching for that username');
	  //if entered userName exists
	  if(exist && !err){
	  	 console.log('1. User found with same name' );
	    //Get that user's deadline
	      User.findOne({'name' : req.session.userName},'date', function (err, person) {
	      if (err) return handleError(err);
	      existingDeadline = new Date(person.date);
	      // res.send(existingDeadline);
	      //get the date variable of existing user
		   // obj = {
	    //         date : existingDeadline
	    //  	}; 
		  // res.send(obj);

		  console.log('2. Existing deadline is' + existingDeadline);
		
		    if (req.session.userName) {
    html += '<br>Your existing deadline from your session is: ' +  existingDeadline;
  }
  res.send(html);
		  
		// console.log(dated);
		});
	   
	  } else {
	  	
	  	user0 = new User({
		name : req.session.userName,
		date : req.session.enteredDate,
		isWritten : true
		});

		//if user doesn't exist, save
	  	user0.save(function (err, data) {
	  		console.log('1. Does NOT exist');
			if (err) console.log(err);
			else{
				//save deadline into var
				newDeadline =  new Date(data.date);

				// res.send(newDeadline);
				// res.send(newDeadline);
				console.log('2. New Date is' , newDeadline );
			 console.log('Cookies: ', req.cookies)
			     if (req.session.userName) {
    html += '<br>Your new deadline is: ' +  newDeadline;
  }
  res.send(html);
			}
  		// res.send(newDeadline);
			});
	  	// res.json(dated);
	    }

	   
	});
	


});

server.post('/', function(req, res){
  req.session.userName = req.body.userName;
  req.session.enteredDate = req.body.enteredDate;
  var data = new Date(req.session.enteredDate);
  console.log(data);
  res.redirect('/l');
});


// 	//create model from schema
// 	// first arg:name of schema second:schema template
// 	User = mongoose.model('User', userSchema);
// // parse application/x-www-form-urlencoded 

// 	// connect this server to the mongod server
// 	// make sure u have the same port number that u used to launch mongod with
// 	//make sure u have the right database name too ( not "test" )
// 	// mongoose.connect('mongodb://localhost:6666/countdown');
// 	// instruct the app to use the `bodyParser()` middleware for all routes

	
	
	// what's the default folder for any requests to static files
	server.use(express.static(__dirname+'/public'));
	// compress all responses

	//for CORS errors, we are adding these to our header to resolve conflict with security
	server.use(function(req, res, next){
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

// 	// This route receives the posted form.
// 	// As explained above, usage of 'body-parser' means
// 	// that `req.body` will be filled in with the form elements
// 	server.use(cors());
// 	server.get('/',function(req,res){
// 	// res.sendFile(__dirname + '/public/login.html');
// 	res.render('login');

// 	  // console.log(req.body.name) ;
// 	  //__dirname : It will resolve to your project folder.
// 	});
// 	server.get('/love',function(req,res){
// 	// res.sendFile(__dirname + '/public/login.html');
// 	res.render('countdown');
// 	  // console.log(req.body.name) ;
// 	  //__dirname : It will resolve to your project folder.
// 	});


// server.post('/v',function(req,res){

// 		var userName = req.body.username;
// 		//+ part is test + '12:00:00 UTC+0300'
// 		var dated = req.body.enteredDate;
// 	// User.find({'name' : 'kol'}, 'date', function (err, docs) {
// 	  console.log('TEST ' + userName , dated);
// 	// });
// 	//this is a function with callback 
// 	User.findOne({'name': userName}, function(err, exist) {
// 	console.log('searching for that username');
// 	  //if entered userName exists
// 	  if(exist && !err){
// 	  	 console.log('1. User found with same name' );
// 	    //Get that user's deadline
// 	      User.findOne({'name' : userName},'date', function (err, person) {
// 	      if (err) return handleError(err);
// 	      existingDeadline = new Date(person.date);
// 	      // res.send(existingDeadline);
// 	      //get the date variable of existing user
// 		   // obj = {
// 	    //         date : existingDeadline
// 	    //  	}; 
// 		  // res.send(obj);

// 		  console.log('2. Existing deadline is' + existingDeadline);
			 

		  
// 		// console.log(dated);
// 		});
	   
// 	  } else {
	  	
// 	  	user0 = new User({
// 		name : userName,
// 		date : dated,
// 		isWritten : true
// 		});

// 		//if user doesn't exist, save
// 	  	user0.save(function (err, data) {
// 	  		console.log('1. Does NOT exist');
// 			if (err) console.log(err);
// 			else{
// 				//save deadline into var
// 				newDeadline =  new Date(data.date);

// 				// res.send(newDeadline);
// 				// res.send(newDeadline);
// 				console.log('2. New Date is' , newDeadline );
// 			 console.log('Cookies: ', req.cookies)
// 			}
//   		// res.send(newDeadline);
// 			});
// 	  	// res.json(dated);
// 	    }

	   
// 	});
	

// });
	

	server.listen( 4444, function(err){
		if(err) console.log(err);
		else console.log('Running server on port 4444');
	});

