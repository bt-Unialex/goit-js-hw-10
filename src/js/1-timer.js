import { convertMs } from './covertMs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  position: 'topRight',
  iconColor: '#fff',
  messageColor: '#fff',
});

const flatpickrOptions = {
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
        iconUrl: '../img/error.svg',
        message: 'Please choose a date in the future',
      });
    } else {
      buttonStart.disabled = false;
      userSelectedDate = selectedDates[0];
      iziToast.destroy();
    }
  },
};

let userSelectedDate;
let intervalID;
const calendar = flatpickr('#datetime-picker', flatpickrOptions);

const fieldDays = document.querySelector('[data-days]');
const fieldHours = document.querySelector('[data-hours]');
const fieldMinutes = document.querySelector('[data-minutes]');
const fieldSeconds = document.querySelector('[data-seconds]');

const buttonStart = document.querySelector('[data-start]');
buttonStart.addEventListener('click', startTimer);

function startTimer() {
  buttonStart.disabled = true;
  calendar.input.disabled = true;

  renderTime(userSelectedDate);

  intervalID = setInterval(renderTime, 1000, userSelectedDate);
}
function renderTime(time) {
  const interval = time - Date.now();
  if (interval <= 0) {
    clearInterval(intervalID);
    buttonStart.disabled = false;
    calendar.input.disabled = false;
    iziToast.success({
      iconUrl: '../img/Ok.svg',
      message: 'Done!',
    });
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(interval);

  fieldDays.textContent = addLeadingZero(days);
  fieldHours.textContent = addLeadingZero(hours);
  fieldMinutes.textContent = addLeadingZero(minutes);
  fieldSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return (value ?? '00').toString().padStart(2, '0');
}
