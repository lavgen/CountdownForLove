  		     var inc=0;
			 function myFunction() {
			    inc=inc+1;
			    // console.log(inc);    
			 }
  		      function doStuff()

      			{
 			   // //get input user put to website
  		   //     var nameElement = document.getElementById("someInput");
		     //   theName = nameElement.value;
		     //   console.log(theName);
		    
		// var deadline = 'March 03 2017 23:59:59 UTC+0300';
		var deadline = "";
		var nameElement = document.getElementById("someInput").value;
		localStorage.setItem("nameElement", nameElement);
		//Awhen the page has loaded), get it like:

		var storedDate = localStorage.getItem("nameElement");
		console.log(storedDate);
		var deadline = storedDate;
		if (deadline =! ""){
			

		}

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

		// var deadline = new Date(Date.parse(ne    w Date()) + 33 * 24 * 60 * 60 * 1000);
		initializeClock('clockdiv', deadline);

		// if (inc => 1) {
		// 	// alert("Are you sure you want to reset the lovers clock?");
		// 	document.getElementById("time").style.display = "none";
		// };
			
		} 
