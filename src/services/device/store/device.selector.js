function selectDevice(state, deviceId) {
  return state.devices.find(device => device._id === deviceId)
}

function selectDeviceIds(state) {
  return state.devices.map(device => device._id)
}


export {
  selectDevice,
  selectDeviceIds
}
