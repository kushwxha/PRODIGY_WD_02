let running = false;
let seconds = 0;
let tens = 0;
let mins = 0;
let lapCounter = 0;
let startTime = 0;
let updatedTime = 0;
let difference = 0;
const getSeconds = document.querySelector('.seconds');
const getTens = document.querySelector('.tens');
const getMins = document.querySelector('.mins');
const btnStart = document.querySelector('.btn-start');
const btnLap = document.querySelector('.btn-lap');
const btnReset = document.querySelector('.btn-reset');
const lapList = document.querySelector('.laps');
let interval;

btnStart.addEventListener('click', () => {
    if (running) {
        clearInterval(interval);
        btnStart.textContent = 'Start';
    } else {
        startTime = Date.now() - difference;
        interval = setInterval(updateDisplay, 10);
        btnStart.textContent = 'Pause';
    }
    running = !running;
});

btnLap.addEventListener('click', () => {
    if (running) {
        lapCounter++;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${formatTime(mins)} : ${formatTime(seconds)} : ${formatTime(tens)}`;
        lapList.appendChild(lapItem);
    }
});

btnReset.addEventListener('click', () => {
    clearInterval(interval);
    running = false;
    btnStart.textContent = 'Start';
    difference = 0;
    startTime = 0;
    updatedTime = 0;
    tens = 0;
    seconds = 0;
    mins = 0;
    lapCounter = 0;
    getMins.textContent = '00';
    getSeconds.textContent = '00';
    getTens.textContent = '00';
    lapList.innerHTML = '';
});

function updateDisplay() {
    updatedTime = Date.now();
    difference = updatedTime - startTime;

    tens = Math.floor((difference % 1000) / 10);
    seconds = Math.floor((difference / 1000) % 60);
    mins = Math.floor((difference / (1000 * 60)) % 60);

    getMins.textContent = formatTime(mins);
    getSeconds.textContent = formatTime(seconds);
    getTens.textContent = formatTime(tens);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}
