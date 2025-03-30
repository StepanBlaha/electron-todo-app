let start = 0;
let intervalId
let timerRunning = false;
let timerReset = false;

function startTimer() {
    if(timerRunning) {
        return;
    }
    timerRunning = true;
    if(start === 0) {
        start = Date.now();
    }else{
        start = Date.now() - start;
    }
    timerReset = false;

    intervalId = setInterval(() => {
        //get time
        let now = Date.now();
        //count elapsed time
        let elapsed = now - start;
        //from ms to seconds
        let seconds = Math.floor(elapsed / 1000);
        //from s to min
        let minutes = Math.floor(seconds / 60);
        //make sure seconds and minutes are in range 0-59
        seconds = seconds % 60;
        //Formatting
        if( seconds < 10) {
            seconds = "0" + seconds;
        }
        if( minutes < 10) {
            minutes = "0" + minutes;
        }
        if (minutes < 0) {
            minutes = "00";
        }

        document.getElementById('timer').innerText = ` ${minutes}:${seconds} `;
    }, 1000);
}
function stopTimer() {
    //Check if timer is running
    if(timerReset) {
        return;
    }
    //Stop the timer
    timerRunning = false
    //Stop the interval
    clearInterval(intervalId);
    //For making sure the time is right
    start = Date.now() - start;
}

function resetTimer() {
    //clear the timer
    timerRunning = false;
    timerReset = true;

    clearInterval(intervalId);
    start = 0;
    document.getElementById('timer').innerText = "00:00";
}
