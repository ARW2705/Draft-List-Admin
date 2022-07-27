import { get } from '../HttpClient/HttpClient'
import base64ToBlobWorker from '../../shared/workers/base64-to-blob.worker'


async function blobifyBase64Image(image64) {
  const contentType = RegExp(/(?:data:)(.*)(?:;)/g).exec(image64)[1]
  return new Promise((resolve, _) => {
    base64ToBlobWorker.onmessage = ({ data }) => resolve(data)
    base64ToBlobWorker.postMessage({
      contentType,
      image64
    })
  })
}

async function fetchImageAsBase64(url) {
  const response = await get(url, {}, {}, 'blob')
  return new Promise((resolve, _) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.readAsDataURL(response)
  })
}

async function getImage(url) {
  return await fetchImageAsBase64(url)
}


export {
  getImage,
  blobifyBase64Image
}
