/***
 * 防抖
 */
let timer = null;

export function debounce(fn, delay = 200) {
  if (typeof fn !== 'function') {
    throw new Error('必须传入函数');
  }
  if (timer !== null) {
    clearTimeout(timer);
  }
  timer = setTimeout(function () {
    fn();
    clearTimeout(timer);
    timer = null;
  }, delay);
}
