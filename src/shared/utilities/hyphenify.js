function hyphenify(word) {
  let hyphened = ''
  for (const char of word) {
    hyphened += char.match(/[A-Z]/) ? `-${char.toLowerCase()}` : char
  }
  return hyphened
}

export default hyphenify
