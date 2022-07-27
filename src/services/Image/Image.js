import imageStore from './Store/ImageStore'
import { get } from '../HttpClient/HttpClient'


async function fetchImageAsBase64(url) {
  const response = await get(url, {}, {}, 'blob')
  return new Promise((resolve, _) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.readAsDataURL(response)
  })
}

async function getImage(url) {
  const fromStore = imageStore.get(url)
  if (fromStore) return fromStore

  const base64Image = await fetchImageAsBase64(url)
  imageStore.setImage(url, base64Image)
  return base64Image
}


export {
  getImage
}
