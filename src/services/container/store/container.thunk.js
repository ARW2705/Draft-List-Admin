import { set } from './container.slice'

import { getAllContainers } from '../http/container-http'


function setAllFromAPI() {
  return async dispatch => {
    try {
      const containersResponse = await getAllContainers()
      dispatch(set(containersResponse))
    } catch (error) {
      console.log('fetch error', error)
    }
  }
}


export {
  setAllFromAPI
}
