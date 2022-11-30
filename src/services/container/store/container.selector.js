function selectContainer(state, containerId) {
  return state.containers.find(container => container._id === containerId)
}

export {
  selectContainer
}
