/**
 * Convert base 64 image to Blob
 * see https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @param: image64 - base 64 image string
 * @param: [contentType] - image type; default is empty string
 * @param: [sliceSize] - divide image into slices of this size; default is 512
 * @return: new blob of the image
 */
function base64ToBlob(image64, contentType = '', sliceSize = 512) {
  const encoded = image64.split(',')[1]
  const byteChars = atob(encoded)
  let byteArrays = []
  for (let slice = 0; slice < byteChars.length; slice += sliceSize) {
    const currentSlice = byteChars.slice(slice, slice + sliceSize)
    let byteNums = []
    for (let i = 0; i < currentSlice.length; i++) {
      byteNums = [...byteNums, currentSlice.charCodeAt(i)]
    }
    byteArrays = [...byteArrays, new Uint8Array(byteNums)]
  }

  return new Blob(byteArrays, { type: contentType }) 
}

export default base64ToBlob
