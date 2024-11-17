// throttle scroll script

function throttle (func, timeout) {
    let timer = null;
    return function perform(...args) {
      if (timer) return
  
      timer = setTimeout( () => {
        func(...args);
        clearTimeout(timer);
        timer = null;
      }, timeout)
    }
  }
  
  // throttle toaster script
  
   function throttleToaster (func, delay) {
    let lastExecutionTime = 0;
    return function(...args) {
      const now = new Date().getTime();
      if (now - lastExecutionTime > delay) {
        func.apply(this, args);
        lastExecutionTime = now;
      }
    };
  }

  
  export { throttle, throttleToaster };