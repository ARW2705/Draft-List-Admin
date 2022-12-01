import base64ToBlobWorker from '../../shared/workers/base64-to-blob.worker'

async function blobifyBase64Image(image64) {
  if (!image64) return image64

  try {
    const contentType = RegExp(/(?:data:)(.*)(?:;)/g).exec(image64)[1]
    console.log(contentType)
    return new Promise((resolve, _) => {
      base64ToBlobWorker.onmessage = ({ data }) => resolve(data)
      base64ToBlobWorker.postMessage({
        contentType,
        image64
      })
    })
  } catch(error) {
    console.log('failed to blobify image', error)
    return Promise.reject(error)
  }
}


export {
  blobifyBase64Image
}
