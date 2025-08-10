export function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout); // Cancel previous timer
    timeout = setTimeout(() => {
      func(...args); // Call function if no event during delay
    }, delay);
  };
}