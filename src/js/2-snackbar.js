import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  position: 'topRight',
  titleColor: '#fff',
  iconColor: '#fff',
  messageColor: '#fff',
  timeout: 10000,
  //   maxWidth: '600px',
  resetOnHover: true,
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
});

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', submitHandle);

function submitHandle(event) {
  event.preventDefault();
  const state = formEl.state.value;
  const delay = formEl.delay.value;

  iziToast.warning({
    position: 'topCenter',
    title: 'PENDING',
    timeout: delay - 300,
    message: state,
  });

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (state) {
        case 'fulfilled':
          resolve(delay);
          break;

        case 'rejected':
          reject(delay);
          break;

        default:
          break;
      }
    }, delay);
  });

  promise.then(resolveFn).catch(rejectFn);

  function resolveFn(reolveValue) {
    iziToast.success({
      title: 'OK',
      iconUrl: '../img/Ok.svg',
      message: `✅ Fulfilled promise in ${reolveValue}ms`,
    });
  }
  function rejectFn(rejectValue) {
    iziToast.error({
      title: 'ERROR',
      iconUrl: '../img/error.svg',
      message: `❌ Rejected promise in ${rejectValue}ms`,
    });
  }
}
