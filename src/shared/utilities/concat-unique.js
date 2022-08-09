/**
 * Concatenate arrays removing duplicate values
 * 
 * @param: sourceArray - primary array; first to be processed, order is maintained
 * @param: arrayToAppend - secondary array; items will be in order except duplicates
 * @param: [hashingValueFn] - optional function to create the hashable value
 * @return: concatenated array with no duplicates
 */
function concatUnique(sourceArray, arrayToAppend, hashingValueFn = i => JSON.stringify(i)) {
  const unique = new Set()
  let concatArray = []
  const processItem = item => {
    const key = hashingValueFn(item)
    if (!unique.has(key)) {
      concatArray = [...concatArray, item]
      unique.add(key)
    }
  }

  sourceArray.forEach(processItem)
  arrayToAppend.forEach(processItem)

  return concatArray
}

export default concatUnique
