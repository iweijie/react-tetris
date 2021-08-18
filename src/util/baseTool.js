/**
 *作者: weijie
 *功能描述: 全局公共方法文件
 *时间: 2018/4/2 14:35
 */

// 节流
export function debounce(fn, delay) {
  delay = delay || 200;
  let timer;
  return function () {
    let th = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      timer = null;
      fn.apply(th, args);
    }, delay);
  };
}
