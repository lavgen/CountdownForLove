
	var express = require('express');
	var server = express();
	var cookieParser = require('cookie-parser');
	var expressSession = require('express-session');
	var bodyParser = require('body-parser');
	var mongoose = require('mongoose');
	var fs = require('fs');

	var data;
	var Schema;
	var userSchema;
	//user for schema
	var user0;
	var userID;
	//variables for date deadlines
	var newDeadline;
	var existingDeadline;
	server.use(cookieParser());
	server.use(expressSession({secret:'prop', cookie:{maxAge:1000}}));
	//serve everything in public as static files
	server.use(express.static(__dirname+'/public'));
	//connect to database named countdown
	mongoose.connect('mongodb://lalavgen.com:6666/countdown');
	var db = mongoose.connection;
	//if error log error 
	db.on('error', function (err) {

		console.log('connection error', err);

	});
	db.once('open', function () {
	//once open, console log
		console.log('MONGODB connected.');

	});

	//create new schema to use on model to insert
	Schema = mongoose.Schema;
	//our new user schema
	userSchema = new Schema({
	name : String,
	date : String,
	isWritten : Boolean
	}, {collection: 'users'});

	// first arg:name of schema second:schema template
	User = mongoose.model('User', userSchema);

	// this sets up the type of templating engine to use 
	server.engine('html', require('hogan-express'));
	// set the folder where the views ( ie. template files ) are in
	server.set('views',  __dirname+ '/views'); 
	server.set('view engine', 'html'); 

	//get request for first login  page
	server.get('/login', function(req, res){
		//render login html from views folder
		res.render('login');
	   
	});	

	//get request for new User form which is posted to /newUser from login.html
	server.get('/newUser', function(req, res){
		//search for that username in database first
		User.findOne({'name': req.query.username}, function(err, exist) {
			//if that username was taken by someone else warn user to pick another username
			if(exist && !err){
				req.session.error = 'Looks like that username has been taken, please choose another one.';
				res.render('login', { error: req.session.error });
				delete req.session.error; // remove from further requests
				
				console.log('LOOKS LIKE THAT USERNAME WAS ALREADY TAKEN..');
			}else if (!exist && !err) {
					// create new user for mongodb
			  	user0 = new User({
				name : req.query.username,
				date : req.query.enteredDate,
				isWritten : true
				});
		
				//if user doesn't exist, save
			  	user0.save(function (err, data) {

			  		console.log('1. Does NOT exist');
					if (err) console.log(err);
					else{
						console.log('Saved!');
						//save new deadline into var
						newDeadline =  data.date;
						console.log(newDeadline + "deadline is");
						//send user to countdown.html with the variable
					    res.render('countdown', {date : newDeadline});

					}
		  		// res.send(newDeadline);
				});
				};
		});
	
		
	   
	});
	//get request for existing users
	server.get('/existingUser', function(req,res){
		//search the entered name in database
		User.findOne({'name': req.query.username}, function(err, exist) {
			//if user exists and no error
			if(exist && !err ){
			    //Get that user's deadline from mongodb

			    User.findOne({'name' : req.query.username},'date', function (err, person) {
			    	//save deadline into variable
			    	var existingDeadline = person.date;
				    console.log('2. Existing deadline is' + existingDeadline);
				    
		  		    res.render('countdown', {date : existingDeadline});
		  		    delete req.session.error; // remove from further requests
		  		
				});
			//if entered username doesn't appear on database send error and redirect to login
			}else if (!exist) {
				req.session.error = 'Looks like that username does not exist. Did you type it right?';
				res.render('login', { error: req.session.error });
				delete req.session.error; // remove from further requests
			};
		});
		

	});
	//start server
	server.listen( 4444, function(err){

		if(err) console.log(err);
		else console.log('Running server on port 4444');
	});

