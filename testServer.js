
	var express = require('express');
	var server = express();
	var cookieParser = require('cookie-parser');
	var expressSession = require('express-session');
	var bodyParser = require('body-parser');
	var mongoose = require('mongoose');
	var fs = require('fs');
	var cors = require("cors");
	var router = express.Router();


	//for CORS errors, we are adding these to our header to resolve conflict with security
	server.use(function(req, res, next){
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

	//global vars
	var data;
	var Schema;
	var userSchema;
	//user for schema
	var user0;
	var userID;
	var User;
	var newDeadline;
	var existingDeadline;

	server.use(express.static(__dirname+'/public'));
	//connect to database named countdown
	mongoose.connect('mongodb://192.168.1.66:6666/countdown');
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
	server.engine('html', require('hogan-express'));
	server.set('views',  __dirname+ '/views'); // set the folder where the views ( ie. template files ) are in
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
	server.use(expressSession({secret:'prop', cookie:{maxAge:1000}}));

	server.get('/', function(req, res){
	server.locals.title = 'Countdown';	
	    var html = '<meta name="viewport" content="width=device-width, initial-scale="1">'+
	    '<link href="https://fonts.googleapis.com/css?family=Barrio">'+
		'<link href="https://fonts.googleapis.com/css?family=Josefin+Sans:300,300i,400,400i">'+
		'<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet">'+
		'<link href="https://fonts.googleapis.com/css?family=Arvo|Barrio">'+
		'<meta http-equiv="content-type" content="text/html;charset=utf-8" />'+
	    '<link rel="stylesheet" href="stylesheet.css">'+
	    '<link rel="stylesheet" href="media.css">'+
	    '<div id="main1">'+
	    '<div id="main">'+
		'<div id="createuser">'+
		'<span id="title" >FOR NEW USERS</span>'+
		'<form action="/" method="POST">' + 
		'<input id="userNew" class="inputBox" type="text" placeholder="Username for you&Your&#x2665;" name="userName">' +
		'<input class="inputBox" type="date" placeholder="Special date to countdown:* " name ="enteredDate" style="margin-top:0em;">' +
		'<button  name="submitButton" id="Submit" type="submit" width:80%;" >Create new user</button>' +
		'</form>' +
		'</div>'+
		'<div id="existinguser">'+
		'<span id="title"> FOR EXISTING USERS</span>' +
		'<form action="/" method="POST">' +
		'<input id="userExists" class="inputBox" type="text"  placeholder="Username:* " name="userName">'+
		'<button name="submitButton1" id="Submit" type="submit"> Enter Username</button>'+
		'</form>' +
		'</div>'+
		'</div>'+
		'</div>';
		
		if (req.session.userExists) {
			
			  // html += '<br>Your existing deadline from your session is: ' +  existingDeadline;
	  	}
	  	console.log(req.session.userExists);
	  	res.send(html);
	
//this below is closing for server.get		
	});
	server.get('/l' , function(req,res){

		res.render('countdown');
	});

	server.post('/', function(req, res){

	  req.session.userExists= req.body.userExists;
	  // req.session.enteredDate = req.body.enteredDate;
	  // if (res.redirect('/l') ) {
	  // 	  //clear cookies?
	  // 	  res.clearCookie(req.session.userName );

	   console.log( req.session.userExists + "POST");
	  //};

	});

	server.listen( 4444, function(err){

		if(err) console.log(err);
		else console.log('Running server on port 4444');
	});

