class PublicError extends Error {
  constructor(message, publicName, publicMessage) {
    super(message)
    this.publicName = publicName || this.name
    this.publicMessage = publicMessage || message
  }
}

export default PublicError
