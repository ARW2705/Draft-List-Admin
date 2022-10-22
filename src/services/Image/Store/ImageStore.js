import storageService from '../../Storage/Storage'
import { IMAGES_STORE_NAME } from '../../../shared/constants/db-store-names'


class ImageStore {
  constructor() {
    if (ImageStore._instance) return ImageStore._instance
    ImageStore._instance = this
  }
  
  async getImage(url) {
    return await storageService.get(IMAGES_STORE_NAME, url)
  }

  async setImage(url, image) {
    await storageService.set(IMAGES_STORE_NAME, image, url)
  }
}

const imageStore = new ImageStore()

export default imageStore
