
var timeStamps = document.getElementsByClassName('timestamp');
var bars = document.getElementsByClassName('resume-playback-progress-bar');
var videos = document.getElementsByClassName('pl-video');
var progress = 0;
/*var timeStamps = [
	'2:30',
  '3:20:10',
  '6:30:40',
  '45:30',
  '14:55:3',
  '10:40:4',
  '32:30'
]*/
//if statement for Disallowing browser console to redeclare the class.
class Time{
       constructor(hours, minutes, seconds){
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
       }

       addValues(hours, minutes, seconds){
        this.hours += hours;
        this.minutes += minutes;
        this.seconds += seconds;
       }

			//check excessive numbers
       checkMinutes(){
        let extraHours = parseInt(this.minutes/60);
        this.hours += extraHours;
        this.minutes -= extraHours*60;
       }
       checkSeconds(){
        let extraMinutes = parseInt(this.seconds/60);
        this.minutes += extraMinutes;
        this.seconds -= extraMinutes*60;
       }
        
       //totalities methods
       totalSeconds(){
       	let seconds = this.seconds + this.totalMinutes()*60;
        return seconds;
       }
       totalMinutes(){
       	let minutes = this.minutes + this.hours*60;
        return minutes;
       }
       
    }
var timeStampsValues = new Time(0, 0, 0);

//extract all durations in form of arrays and stored in timeStampsValues object
for (i=0; i < timeStamps.length; i++){
    let value = timeStamps[i].firstChild.innerHTML.split(':').map(Number);
 		//let value = timeStamps[i].split(':').map(Number);
    
    if(value.length == 3){
    	timeStampsValues.addValues(value[0], value[1], value[2]);
    }else{
    	timeStampsValues.addValues(0, value[0], value[1]);
    }
}
timeStampsValues.checkSeconds();
timeStampsValues.checkMinutes();
console.log(timeStampsValues);

var node = timeStampsValues.hours + ' hours\n ' + timeStampsValues.minutes + ' minutes\n ' + timeStampsValues.seconds + ' seconds\n' + " | " + 'total minutes: ' + timeStampsValues.totalMinutes() + '\n total seconds: ' + timeStampsValues.totalSeconds();

console.log(node);

var container = document.getElementsByClassName('pl-header-content')[0];
var h = document.createElement('h1');
h.innerHTML = node;
h.style = 'color: red;';
h.className= 'estimation';
container.appendChild(h);



// to be continue
for(i=0; i < bars.length; i++){
	progress += parseInt(bars[i].style.width)-2;
}

var pbar = document.createElement('div');
style = 'height: 50px; width: 100%; background-color: grey; display: block;'
pbar.style = style;
var pbarg = document.createElement('div');
pbar.appendChild(pbarg);
pbarg.style = style;
pbarg.style.width = (progress/(videos.length*100))*100 + '%';
pbarg.style.backgroundColor = 'green';

container.appendChild(pbar);
