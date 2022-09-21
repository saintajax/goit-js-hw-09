const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', onBtnStart);
refs.stopBtn.addEventListener('click', onBtnStop);

let intervalsId = 0;

function onBtnStart() {
  refs.body.style.background = getRandomHexColor();
  intervalsId = setInterval(() => {
    refs.body.style.background = getRandomHexColor();
  }, 1000);
  refs.startBtn.disabled = true;
}

function onBtnStop() {
  refs.startBtn.disabled = false;
  clearInterval(intervalsId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
