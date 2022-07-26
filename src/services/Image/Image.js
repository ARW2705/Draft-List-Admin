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
  return await fetchImageAsBase64(url)
}


export {
  getImage
}
