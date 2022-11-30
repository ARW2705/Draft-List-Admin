function matchQuery(collection, searchType, searchTerm, resultType) {
  if (!collection || !searchType || !searchTerm) {
    throw new Error(`
      Query match error: missing -
      ${!collection ? ' collection' : ''}
      ${!searchType ? ' search type' : ''}
      ${!searchTerm ? ' search term' : ''}
    `)
  }

  const searchTypeLower = searchType.toLowerCase()
  const searchTermLower = searchTerm.toLowerCase()
  return collection
    .map(item => {
      if (!item[searchTypeLower]) return null

      if (item[searchTypeLower].toLowerCase().includes(searchTermLower)) {
        if (resultType) {
          if (!item.hasOwnProperty(resultType)) {
            throw new Error(`Query match error: item does not have requested result type ${resultType}`)
          }
          return item[resultType]
        }
        return item
      }

      return null
    })
    .filter(item => !!item)
}

export default matchQuery
