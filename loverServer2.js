
	var express = require('express');
	var server = express();
	var cookieParser = require('cookie-parser');
	var expressSession = require('express-session');
	var bodyParser = require('body-parser');
	var mongoose = require('mongoose');
	var fs = require('fs');

	// - Answer - I was using Cors and Router before, deleted it.

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
	server.engine('html', require('hogan-express'));
	server.set('views',  __dirname+ '/views'); // set the folder where the views ( ie. template files ) are in
	server.set('view engine', 'html'); 

		// - Answer - i am not sure how this works but if I dont add these lines
		// I my req.session variables are undefined, it is something about json
	server.use(bodyParser.urlencoded({ extended: true }))
	// parse application/json 
	server.use(bodyParser.json());
	// parses request cookies, 
	// when the secret is passed, used 
	// for signing the cookies.

	//- Answer - This is how i am reseting the date variable after redirecting to '/l'
	server.use(cookieParser());
	server.use(expressSession({secret:'prop', cookie:{maxAge:1000}}));

	server.get('/test', function(req,res){

		res.render('viewTest',{test : 2});

	});
	server.get('/', function(req, res){
		 // clicked == false;
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
		'<button name="submitButton1" id="Submit" type="submit" onclick="return turn();> Enter Username</button>'+
		'</form>' +
		'</div>'+
		'</div>'+
		'</div>';

	  	// - Answer - I know it runs as soon as page loads, that is not what I am intentionally doing
	  	// I didn't know what to do about it, essentially I have two userName input field and two submit buttons
	  	//one of them is for existing users, one for new users, i want to check which submit button has pressed
	  	//and if button for existinguser field is pressed , find that users date and send as html
	  	//if button for new user is pressed, first check db if that name is taken, if it is taken alert user ,
	  	//if it is not taken save user and send the deadline they put as variable
	  	//I couldn't create th necessary if statement for to detect which submit button user has pressed in form
	  	//and i couldn't create the for loop to check each name and see if that username has been taken before or not
	  	function turn()
		{
		   // clicked == true;
		}

//if statement on form submit  && if submit is empty alert user and not go to the next page 

		User.findOne({'name': req.session.userName}, function(err, exist) {
		console.log('searching for that username');

		if(exist && !err ){
			// console.log('TESTING PURPOSES BELOW REQ.SESSION USER EXISTS' + req.session.userExists);
		    //Get that user's deadline
		    User.findOne({'name' : req.session.userName},'date', function (err, person) {
		    	// I don't know what it did
		    if (err) return console.log(err);
		    	var existingDeadline = new Date(person.date);
			    console.log('2. Existing deadline is' + existingDeadline);
			
			    if (req.session.userName) {

			    	html = existingDeadline;   
					console.log( req.session.userExists + "TYPE IS");  			
	  			}else if (req.session.userName !== person.name ) {
	  					console.log('NOT FOUND USERNAME!!' + 'CLICKED');
	  			}
	  		// - Answer - It is sending a date and that is what I want for the countdown.js
	  		// I am using xmlhttp request in my countdown js to get the date and set it inside countdown function
	  		//I am using res send because my input is not in a template or html page so there is no html to render, i get error w render
	  		res.send( html);
	  		

			});
		  
		  	} else  {
 
		  	//create new user for mongodb
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
					//save new deadline into var
					var newDeadline =  data.date;

					console.log('2. New Date is' , newDeadline );
				 	console.log('Cookies: ', req.session)
				    if (req.session.userName) {

	    				html = newDeadline;
	  				}
	 				 res.send(html);

				}
	  		// res.send(newDeadline);
			});
		  	// res.json(dated);
		    }
//this below is closing for first User.findOne
		});
//this below is closing for server.get		
	});
	server.get('/l' , function(req,res){

		res.render('countdown');
	});

	server.post('/', function(req, res){

	  req.session.userName = req.body.userName;
	  req.session.enteredDate = req.body.enteredDate;
	  if (res.redirect('/l') ) {
	  	// - Answer - I don't know what this exactly does, I needed something to clear the value stored at
	  	//localhost:4444 - before these lines after login redirects to '/l'
	  	// the variable was still visible at localhost:4444 so I couldn't run the application again in another seperate
	  	//window at the same time because instead of login form, i used to see the variable
	  	// so here I am saying if redirected clear the saved date at localhost:4444

	  	res.clearCookie(req.session.userName );

	  };

	});

	server.listen( 4444, function(err){

		if(err) console.log(err);
		else console.log('Running server on port 4444');
	});

