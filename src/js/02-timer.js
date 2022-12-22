import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// const inputDate = document.querySelector('#datetime-picker');

let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    console.log(selectedDate);
  },
};

flatpickr('#datetime-picker', options);
console.log(selectedDate);
