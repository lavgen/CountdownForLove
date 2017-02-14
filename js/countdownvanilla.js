var deadline = 'March 03 2017 23:59:59 UTC+0300';

//function to calculate difference between endtime and current time
function getTimeRemaining(endtime){
  //holds remaining time until deadline
  //data.parse() converts time string into millisecs.
  //we are substracting times in millisecs to get the amount in between
  var t = Date.parse(endtime) - Date.parse(new Date());
  //math to convert millisecs to days,hrs,minutess&seconds
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) );
  
  //output clock data as reusable object
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

var hr = getTimeRemaining(deadline).hours;
var day = getTimeRemaining(deadline).days;

console.log ( day , hr );