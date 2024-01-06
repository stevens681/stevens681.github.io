var input = document.querySelectorAll('#enter input[type=text]')[0],
    entries = {},
    completed = {},
    reminders = {
      create: function(text) {
        if (text != '') {
          var entry = Date.now();
          if (localStorage.entries) {
            entries = JSON.parse(localStorage.entries);
          }
          entries[entry] = text;
          localStorage.entries = JSON.stringify(entries);
          input.value = '';
          reminders.display('entries');
        }
        input.focus();
      },
      display: function(list) {
        var list = JSON.parse(localStorage[list]);
        for (var entry in list) {
          var box = document.createElement('section'),
              task = document.createElement('input'),
              exit = document.createElement('input');
          task.type = 'text';
          task.setAttribute('onblur', 'reminders.edit(this.value, this.parentNode.id)');
          task.value = list[entry];
          exit.type = 'button';
          exit.setAttribute('onclick', 'reminders.complete(this.parentNode.id)');
          exit.value = '✖︎';
          box.id = entry;
          box.appendChild(task);
          box.appendChild(exit);
          if (!document.getElementById(entry)) {
            document.getElementsByTagName('body')[0].insertBefore(box, document.getElementById('enter'));
          }
        }
      },
      edit: function (text, id) {
        entries = JSON.parse(localStorage.entries);
        entries[id] = text;
        localStorage.entries = JSON.stringify(entries);
      },
      complete: function (id) {
        entries = JSON.parse(localStorage.entries);
        if (localStorage.completed) {
          completed = JSON.parse(localStorage.completed);
        }
        completed[id] = entries[id];
        delete entries[id];
        localStorage.completed = JSON.stringify(completed);
        localStorage.entries = JSON.stringify(entries);
        reminders.display('entries');
        document.getElementById(id).remove();
      }
    }
document.onkeydown = function(e) {
  e = e || window.event;
  var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
  if (charCode == 13) { reminders.create(input.value); } /* enter key creates new reminder */
}
reminders.display('entries');


var sound = new Audio("https://www.freespecialeffects.co.uk/soundfx/animals/duck1.wav");
		sound.loop = true;

var h2 = document.getElementById('clock');

// display current time by the second
var currentTime = setInterval(function(){
	var date = new Date();
	
	var hours = (12 - (date.getHours()));
	// var hours = date.getHours();
	
	var minutes = date.getMinutes();
	
	var seconds = date.getSeconds();
	
	var ampm = (date.getHours()) < 12 ? 'AM' : 'PM';


	//convert military time to standard time

	if (hours < 0) {
		hours = hours * -1;
	} else if (hours == 0) {
		hours = 12;
	} else {
		hours = hours;
	}

	
	h2.textContent = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds) + "" + ampm;
	
},1000);


/*functions to get hour, min, secs, 
  am or pm, add zero, set alarm time and sound, clear alarm
*/

function addZero(time) {

		return (time < 10) ? "0" + time : time;
	
}

function hoursMenu(){

	var select = document.getElementById('alarmhrs');
	var hrs = 12

	for (i=1; i <= hrs; i++) {
		select.options[select.options.length] = new Option( i < 10 ? "0" + i : i, i);
		
	}
}
hoursMenu();

function minMenu(){

	var select = document.getElementById('alarmmins');
	var min = 59;

	for (i=0; i <= min; i++) {
		select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
	}
}
minMenu();

function secMenu(){

	var select = document.getElementById('alarmsecs');
	var sec = 59;

	for (i=0; i <= sec; i++) {
		select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
	}
}
secMenu();


function alarmSet() {

	var hr = document.getElementById('alarmhrs');
	
	var min = document.getElementById('alarmmins');
	
	var sec = document.getElementById('alarmsecs');
	
	var ap = document.getElementById('ampm');
    

    var selectedHour = hr.options[hr.selectedIndex].value;
    var selectedMin = min.options[min.selectedIndex].value;
    var selectedSec = sec.options[sec.selectedIndex].value;
    var selectedAP = ap.options[ap.selectedIndex].value;

    var alarmTime = addZero(selectedHour) + ":" + addZero(selectedMin) + ":" + addZero(selectedSec) + selectedAP;
    console.log('alarmTime:' + alarmTime);

    document.getElementById('alarmhrs').disabled = true;
	document.getElementById('alarmmins').disabled = true;
	document.getElementById('alarmsecs').disabled = true;
	document.getElementById('ampm').disabled = true;


//when alarmtime is equal to currenttime then play a sound
	var h2 = document.getElementById('clock');

/*function to calcutate the current time 
then compare it to the alarmtime and play a sound when they are equal
*/

setInterval(function(){

	var date = new Date();
	
	var hours = (12 - (date.getHours()));
	// var hours = date.getHours();
	
	var minutes = date.getMinutes();
	
	var seconds = date.getSeconds();
	
	var ampm = (date.getHours()) < 12 ? 'AM' : 'PM';


	//convert military time to standard time

	if (hours < 0) {
		hours = hours * -1;
	} else if (hours == 0) {
		hours = 12;
	} else {
		hours = hours;
	}
	
	var currentTime = h2.textContent = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds) + "" + ampm;
	

	if (alarmTime == currentTime) {
		sound.play();
		}

},1000);


	// console.log('currentTime:' + currentTime);	

}


function alarmClear() {

	document.getElementById('alarmhrs').disabled = false;
	document.getElementById('alarmmins').disabled = false;
	document.getElementById('alarmsecs').disabled = false;
	document.getElementById('ampm').disabled = false;
	sound.pause();
}
