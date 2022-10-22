import storageService from '../../Storage/Storage'
import { CONTAINERS_STORE_NAME } from '../../../shared/constants/db-store-names'


class ContainerStore {
  constructor() {
    if (ContainerStore._instance) return ContainerStore._instance
    ContainerStore._instance = this
  }

  async getContainer(id) {
    return await storageService.get(CONTAINERS_STORE_NAME, id)
  }

  async getContainers(ids) {
    return (await storageService.getMany(CONTAINERS_STORE_NAME, ids)).filter(container => !!container)
  }

  async getAllContainers() {
    return (await storageService.getAll(CONTAINERS_STORE_NAME))
  }

  async setContainer(container) {
    await storageService.set(CONTAINERS_STORE_NAME, container)
  }

  async setContainers(containers) {
    await storageService.setMany(CONTAINERS_STORE_NAME, containers)
  }
}

const containerStore = new ContainerStore()

export default containerStore
