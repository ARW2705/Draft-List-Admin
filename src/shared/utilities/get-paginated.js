function getPaginated(collection, pageNum, count) {
  const start = pageNum * count
  if (start >= collection.length) return []
  
  const expectedEnd = start + count
  const end = expectedEnd < collection.length ? expectedEnd : collection.length
  let results = []
  for (let i = start; i < end; i++) {
    results = [...results, collection[i]]
  }

  return results
}

export default getPaginated
