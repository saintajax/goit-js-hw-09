import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  submit: document.querySelector('[type="submit"]'),
};

refs.submit.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(refs.form);
  delay = Number(formData.get('delay'));
  step = Number(formData.get('step'));
  amount = Number(formData.get('amount'));
  let deleyStep = delay;
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, deleyStep)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    deleyStep += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
