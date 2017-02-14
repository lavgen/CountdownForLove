
var mongoose = require('../../node_modules/mongoose');
mongoose.connect('mongodb://localhost:6666/');

var db = mongoose.connection;
 
db.on('error', function (err) {
console.log('connection error', err);
});
db.once('open', function () {

console.log('connected.');
});

//schema
var Schema = mongoose.Schema;
var userSchema = new Schema({
name : String,
date : Date,
isWritten : Boolean
});
//create model from schema
var User = mongoose.model('User', userSchema);

var lala = new User({
name : 'Lal',
date : '12/13/2017',
isWritten : true
});


lala.save(function (err, data) {
if (err) console.log(err);
else console.log('Saved : ', data );
});

