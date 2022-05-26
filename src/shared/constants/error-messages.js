import hyphenify from '../utilities/hyphenify'
import toTitleCase from '../utilities/title-case'

const errorMessages = {
  required: name => `${name || 'Field'} is required`,
  minLength: (name, error) => `${name || 'Field'} length must be at least ${error.minLength} characters`,
  maxLength: (name, error) => `${name || 'Field'} length must be at most ${error.maxLength} characters`,
  pattern: name => `${name || 'Field'} is invalid`,
  isEqual: (name, error) => {
    let subject = 'Fields'
    if (error.length) {
      const replacementText = error.length === 2 ? ' and' : ', and'
      subject = error.map(field => {
        return toTitleCase(hyphenify(field).split('-').join(' ').toLowerCase())
      })
      .join(', ')
      .replace(/,(?=[^,]*$)/, replacementText)
    }
    return `${subject} do not match`
    // return `${error.length ? error.map(field => {
    //   return toTitleCase(hyphenify(field).split('-').join(' ').toLowerCase())
    // }).join(', ') : 'Fields'} do not match`
  }
}

export default errorMessages