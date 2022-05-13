function throttle(cb, delay) {
  let shouldWait

  return event => {
    if (shouldWait) return

    shouldWait = true
    setTimeout(() => {
      cb(event)
      shouldWait = false
    }, delay)
  }
}

export default throttle
