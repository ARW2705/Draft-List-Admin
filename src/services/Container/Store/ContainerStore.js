class ContainerStore {
  constructor() {
    if (ContainerStore._instance) return ContainerStore._instance
    ContainerStore._instance = this
    this.storageKey = 'containers'
    this.containers = {}
  }

  getContainer(containerId) {
    return this.containers[containerId]
  }

  getContainers(containerIds) {
    return containerIds.map(containerId => this.getContainer(containerId).filter(container => !!container))
  }

  getAllContainers() {
    return this.containers
  }

  setContainer(container) {
    if (container.hasOwnProperty('_id')) {
      container = this.prepareContainer(container)
    }
    this.containers = { ...this.containers, ...container }
  }

  setContainers(containers) {
    this.setContainer(containers.reduce((acc, curr) => ({ ...acc, ...this.prepareContainer(curr) }), {}))
  }

  prepareContainer(container) {
    return { [container._id]: container }
  }

  loadContainers() {
    this.containers = JSON.parse(localStorage.getItem(this.storageKey))
  }

  storeContainers() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.containers))
  }
}

const containerStore = new ContainerStore()

export default containerStore
