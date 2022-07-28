class ImageStore {
  constructor() {
    if (ImageStore._instance) return ImageStore._instance
    ImageStore._instance = this
    this.storageKey = 'images'
    this.images = {} // core image defs
    this.loadImages()
  }

  getImage(url) {
    return this.images[url]
  }

  setImage(url, image) {
    this.images = { ...this.images, [url]: image }
    this.storeImages()
  }

  clearImages() {
    this.image = {}
    this.storeImages()
  }

  loadImages() {
    const images = JSON.parse(localStorage.getItem(this.storageKey))
    if (images) this.images = images
  }

  storeImages() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.images))
  }
}

const imageStore = new ImageStore()

export default imageStore
