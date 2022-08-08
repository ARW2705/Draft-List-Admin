import { getAllContainers as getAllContainersFromServer, getContainerById as getContainerByIdFromServer } from './Http/ContainerHttp'
import containerStore from './Store/ContainerStore'


async function getAllContainers() {
  const storedContainers = containerStore.getAllContainers()
  if (Object.keys(storedContainers).length) {
    return storedContainers
  }

  const containers = await getAllContainersFromServer()
  containerStore.setContainers(containers)
  return containers
}

async function getContainerById(containerId) {
  const storedContainer = containerStore.getContainer(containerId)
  if (storedContainer) return storedContainer

  const container = await getContainerByIdFromServer(containerId)
  containerStore.setContainers(container)
  return container
}


export {
  getContainerById,
  getAllContainers
}
