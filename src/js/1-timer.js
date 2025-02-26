import { convertMs } from './covertMs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] <= Date.now()) {
      buttonStart.disabled = true;
      iziToast.error({
        backgroundColor: '#EF4040',
        position: 'topRight',
        iconUrl: './img/error.svg',
        message: errorText,
      });
    } else {
      buttonStart.disabled = false;
      userSelectedDate = selectedDates[0] - Date.now();
      iziToast.destroy();
    }
  },
};

let userSelectedDate;
const errorText = 'Please choose a date in the future';
const calendar = flatpickr('#datetime-picker', options);
calendar.input.disabled = false;

const fieldDays = document.querySelector('[data-days]');
const fieldHours = document.querySelector('[data-hours]');
const fieldMinutes = document.querySelector('[data-minutes]');
const fieldSeconds = document.querySelector('[data-seconds]');
const buttonStart = document.querySelector('[data-start]');

buttonStart.addEventListener('click', startTimer);
function startTimer() {
  buttonStart.disabled = true;
  calendar.input.disabled = true;
  console.log(' startTimer input:', calendar.input);
  const { day, hours, minutes, seconds } = convertMs(userSelectedDate);

  fieldDays.textContent = addLeadingZero(day);
  fieldHours.textContent = addLeadingZero(hours);
  fieldMinutes.textContent = addLeadingZero(minutes);
  fieldSeconds.textContent = addLeadingZero(seconds);
}
function addLeadingZero(value) {
  return (value ?? '00').toString().padStart(2, '0');
}
