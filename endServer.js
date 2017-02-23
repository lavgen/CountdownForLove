
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


	server.get('/login', function(req, res){

		res.render('login');
	   
	});	
	//get request for new User form which is posted to /newUser from login.html
	server.get('/newUser', function(req, res){
		console.log('USERNAME IS: ' + req.query.username);
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
				    res.render('countdown', {tt : newDeadline});

				}
	  		// res.send(newDeadline);
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
			    	var existingDeadline = new Date(person.date);
				    console.log('2. Existing deadline is' + existingDeadline);
		  		    res.render('countdown', {tt :existingDeadline});
		  		
				});
			}
		});
		

	});
	//start server
	server.listen( 4444, function(err){

		if(err) console.log(err);
		else console.log('Running server on port 4444');
	});

