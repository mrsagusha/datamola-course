import { controller } from '.';

export function a() {
  document.addEventListener('click', () => {
    console.log(controller);
  });
}
