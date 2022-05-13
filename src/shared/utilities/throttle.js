function throttle(cb, delay) {
  let shouldWait

  return () => {
    if (shouldWait) return

    shouldWait = true
    setTimeout(() => {
      cb()
      shouldWait = false
    }, delay)
  }
}

export default throttle
