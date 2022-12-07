/**
 * Find all values that are unique between two arrays
 * 
 * @param: arr1 - array of primitive values
 * @param: arr2 - array of primitive values
 * @return: array of all values that exclusively exist in one of the arrays 
 */
function findUniqueInArrays(arr1, arr2) {
  const previous1 = new Set(arr1)
  const previous2 = new Set(arr2)
  let unique = []

  for (const item1 of previous1) {
    if (!previous2.has(item1)) {
      unique = [...unique, item1]
    }
  }

  for (const item2 of previous2) {
    if (!previous1.has(item2)) {
      unique = [...unique, item2]
    }
  }

  return unique
}

export default findUniqueInArrays
