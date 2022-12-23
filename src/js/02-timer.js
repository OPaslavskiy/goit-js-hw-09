import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let selectedDate;
let difference;
let timer = {};
let currentDate;

const startBtn = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');

console.log(input);

const refs = {
  daysTimer: document.querySelector('span[data-days]'),
  hoursTimer: document.querySelector('span[data-hours]'),
  minutesTimer: document.querySelector('span[data-minutes]'),
  secondsTimer: document.querySelector('span[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    choiseDate();
  },
};

startBtn.addEventListener('click', lunchTimer);

startBtn.disabled = true;

flatpickr('#datetime-picker', options);

function choiseDate() {
  currentDate = new Date();
  if (currentDate - selectedDate < 0) {
    Notiflix.Notify.success(`I start the countdown timer to ${selectedDate}`);
    startBtn.disabled = false;
    return;
  }
  Notiflix.Notify.failure('Please choose a date in the future');
}

function lunchTimer() {
  const timerID = setInterval(() => {
    currentDate = new Date();
    difference = selectedDate - currentDate;
    timer = convertMs(difference);
    console.log(difference);
    addLeadingZero(timer);
    startBtn.disabled = true;
    input.disabled = true;
    if (difference < 1000) {
      stopTimer(timerID);
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(timer) {
  const zeroTimer = {
    days: timer.days.toString().padStart(2, '0'),
    hours: timer.hours.toString().padStart(2, '0'),
    minutes: timer.minutes.toString().padStart(2, '0'),
    seconds: timer.seconds.toString().padStart(2, '0'),
  };

  pageTimerUpdates(zeroTimer, refs);
}

function pageTimerUpdates(zeroTimer, refs) {
  // const abv = timer.days.padStart(2, '0');
  refs.daysTimer.textContent = zeroTimer.days;
  refs.hoursTimer.textContent = zeroTimer.hours;
  refs.minutesTimer.textContent = zeroTimer.minutes;
  refs.secondsTimer.textContent = zeroTimer.seconds;
}

function stopTimer(timerID) {
  clearInterval(timerID);
  startBtn.disabled = false;
  input.disabled = false;
}
