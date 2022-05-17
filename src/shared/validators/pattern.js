function pattern(regex) {
  return input => regex.test(input)
}

export default pattern
