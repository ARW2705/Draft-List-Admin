function toTitleCase(words) {
  return words.split(' ').map(word => word.replace(word[0], word[0].toUpperCase())).join(' ')
}

export default toTitleCase
