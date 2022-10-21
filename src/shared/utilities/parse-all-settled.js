/**
 * Parses array returned from Promise.allSettled function into arrays of values and errors
 * 
 * @param: promiseResult - array returned from Promise.allSettled
 * @return: object containing 'values' array with the value of each resolved promise
 *          and 'errors' array with the reason of each rejected promise
 */
function parseAllSettled(promiseResult) {
  let values = [], errors = []
  promiseResult.forEach(result => {
    if (result.status === 'fulfilled') {
      values = [...values, result.value]
    } else {
      errors = [...errors, result.reason]
    }
  })

  return { values, errors }
}

export { parseAllSettled }
