import { set } from './image.slice'

import { getImage } from '../http/image-http'

import defaultImage from '../../../assets/images/hops-and-grains_1280x640.png'


function getImageAsBase64(url) {
  return async dispatch => {
    try {
      const imageResponse = await getImage(url)
      const reader = new FileReader()
      reader.onloadend = () => {
        dispatch(set({ url, image: reader.result }))
      }
      reader.readAsDataURL(imageResponse)
    } catch (error) {
      console.log('fetch error', error)
      dispatch(set({ url, image: defaultImage }))
    }
  }
}


export {
  getImageAsBase64
}
