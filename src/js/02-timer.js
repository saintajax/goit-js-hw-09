import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysSpan: document.querySelector('[data-days]'),
  hoursSpan: document.querySelector('[data-hours]'),
  minutesSpan: document.querySelector('[data-minutes]'),
  secSpan: document.querySelector('[data-seconds]'),
};
let chousenTime = '';
let idInterval = '';

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.startBtn.disabled = true;

if (chousenTime > Date.now()) {
  refs.startBtn.disabled = false;
}

flatpickr(refs.input, {
  enableTime: true,
  locale: {
    firstDayOfWeek: 1,
  },
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chousenTime = +selectedDates[0];
    if (chousenTime > Date.now()) {
      refs.startBtn.disabled = false;
    } else {
      Notify.failure('Please choose a date in the future');
    }
  },
});

function onStartBtnClick(e) {
  Notify.success('Timer started');
  refs.input.disabled = true;
  refs.startBtn.disabled = true;
  idInterval = setInterval(() => {
    let currentTime = Date.now();
    if (currentTime >= chousenTime) {
      clearInterval(idInterval);
      refs.input.disabled = false;
      Report.success(
        'Сountdown is over',
        '"Do not try to become a person of success but try to become a person of value." <br/><br/>- Albert Einstein',
        'Okay'
      );
      return;
    }
    clockRefresh(convertMs(chousenTime - currentTime));
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function clockRefresh({ days, hours, minutes, seconds }) {
  refs.daysSpan.textContent = addLeadingZero(days);
  refs.hoursSpan.textContent = addLeadingZero(hours);
  refs.minutesSpan.textContent = addLeadingZero(minutes);
  refs.secSpan.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
