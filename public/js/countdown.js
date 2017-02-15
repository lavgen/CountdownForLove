
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    date = this.responseText.substring(1, this.responseText.length - 1);
    dateDated = Date.parse(date);
    var d = '2015-03-04T00:00:00.000Z';
    var deadline = new Date(Date.parse(new Date(date)));
     console.log(typeof date, date, d, dateDated) ;
     // var deadline = new Date(dateDated).toUTCString();
     // var isoDate = deadline.toUTCString();
     console.log(deadline);
     
	    function getTimeRemaining(endtime) {

			  var t = Date.parse(endtime) - Date.parse(new Date());
			  var seconds = Math.floor((t / 1000) % 60);
			  var minutes = Math.floor((t / 1000 / 60) % 60);
			  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
			  var days = Math.floor(t / (1000 * 60 * 60 * 24));
			  return {
			    'total': t,
			    'days': days,
			    'hours': hours,
			    'minutes': minutes,
			    'seconds': seconds
			  };

		}
		
		function initializeClock(id, endtime) {
			
			  var clock = document.getElementById(id);
			  var daysSpan = clock.querySelector('.days');
			  var hoursSpan = clock.querySelector('.hours');
			  var minutesSpan = clock.querySelector('.minutes');
			  var secondsSpan = clock.querySelector('.seconds');

			  function updateClock() {
			    var t = getTimeRemaining(endtime);

			    daysSpan.innerHTML = t.days;
			    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
			    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
			    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

			    if (t.total <= 0) {
			      clearInterval(timeinterval);
			    }
			  }

			  updateClock();
			  var timeinterval = setInterval(updateClock, 1000);
		}
	

			initializeClock('clockdiv', deadline);	

	

    }
  };
  xhttp.open("GET", "http://localhost:4444", true);
  xhttp.send(null);

	//this will start with any sub,mit button
// 	function loadReq(){
	
// 	var xmlhttp = new XMLHttpRequest();
// 	var url = "http://localhost:4444";
// 	xmlhttp.open("GET", url, true);
// 	xmlhttp.setRequestHeader('Accept', 'application/json');
// 		console.log(xmlhttp.status);
// 	xmlhttp.onreadystatechange = function() {
//     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    
//         var data = xmlhttp.responseText;  
//         // var dataJson =JSON.parse(data);
//         console.log(date); 
// 	    	//get data 
// 	      // var data = xhttp.value;
// 	      // var deadline = new Date(first);
// 	      // deadline = deadlineISO.toUTCString();
// 	      // var deadline = new Date(Date.parse(deadlineISO));
// 		// var deadline = 'March 03 2017 23:59:59 UTC+0300';

// 	    function getTimeRemaining(endtime) {

// 			  var t = Date.parse(endtime) - Date.parse(new Date());
// 			  var seconds = Math.floor((t / 1000) % 60);
// 			  var minutes = Math.floor((t / 1000 / 60) % 60);
// 			  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
// 			  var days = Math.floor(t / (1000 * 60 * 60 * 24));
// 			  return {
// 			    'total': t,
// 			    'days': days,
// 			    'hours': hours,
// 			    'minutes': minutes,
// 			    'seconds': seconds
// 			  };

// 		}
		
// 		function initializeClock(id, endtime) {
			
// 			  var clock = document.getElementById(id);
// 			  var daysSpan = clock.querySelector('.days');
// 			  var hoursSpan = clock.querySelector('.hours');
// 			  var minutesSpan = clock.querySelector('.minutes');
// 			  var secondsSpan = clock.querySelector('.seconds');

// 			  function updateClock() {
// 			    var t = getTimeRemaining(endtime);

// 			    daysSpan.innerHTML = t.days;
// 			    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
// 			    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
// 			    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

// 			    if (t.total <= 0) {
// 			      clearInterval(timeinterval);
// 			    }
// 			  }

// 			  updateClock();
// 			  var timeinterval = setInterval(updateClock, 1000);
// 		}
	

// 			initializeClock('clockdiv', deadline);	

	

	
	 
	
// 	}

     
// 		    }
// 	xmlhttp.send(null);

	
// };
