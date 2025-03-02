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
        iconUrl: 'img/error.svg',
        message: 'Please choose a date in the future',
      });
    } else {
      buttonStart.disabled = false;
      userSelectedDate = selectedDates[0];
      iziToast.destroy();
    }
  },
};
const calendar = flatpickr('#datetime-picker', flatpickrOptions);

let userSelectedDate;
let intervalID;
let sec = 1000;

const timer = document.querySelector('.timer');
const fieldDays = timer.children[0].firstElementChild;
// const fieldDays = document.querySelector('[data-days]');
const fieldHours = timer.children[1].firstElementChild;
// const fieldHours = document.querySelector('[data-hours]');
const fieldMinutes = timer.children[2].firstElementChild;
// const fieldMinutes = document.querySelector('[data-minutes]');
const fieldSeconds = timer.children[3].firstElementChild;
// const fieldSeconds = document.querySelector('[data-seconds]');

const buttonStart = document.querySelector('[data-start]');
buttonStart.addEventListener('click', startTimer);

function startTimer() {
  buttonStart.disabled = true;
  calendar.input.disabled = true;

  renderTime(userSelectedDate);

  intervalID = setInterval(renderTime, sec, userSelectedDate);
  setTimeout(surprise, 3000);
}
function renderTime(time) {
  const interval = time - Date.now();
  if (interval <= 0) {
    clearInterval(intervalID);
    buttonStart.disabled = false;
    calendar.input.disabled = false;
    iziToast.success({
      iconUrl: 'img/Ok.svg',
      message: 'Done!',
    });
    timer.style.cssText = '';
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

const buttonFForward = document.querySelector('#datetime-picker+button+button');
buttonFForward.addEventListener('click', fastForward);
let multiplier = 0;

function fastForward() {
  console.log('click');

  clearInterval(intervalID);
  intervalID = setInterval(
    renderTimeFaster,
    Math.round(sec / 10),
    userSelectedDate
  );
  timer.style.cssText = ' animation: shake 40ms infinite linear;';
  buttonFForward.style.cssText = '';
  buttonFForward.disabled = true;
}
function surprise() {
  multiplier = 0;
  buttonFForward.disabled = false;
  buttonFForward.style.cssText =
    'color: #fff; background-color: #4e75ff; pointer-events: all;';
}
function renderTimeFaster(time) {
  const newTime = time - 0.9 * sec * multiplier;
  multiplier += 1;
  renderTime(newTime);
}
