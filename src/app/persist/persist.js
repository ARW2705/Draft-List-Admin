export const loadState = key => {
  try {
    const state = localStorage.getItem(key)
    if (!state) return undefined
    return JSON.parse(state)
  } catch(error) {
    return undefined
  }
}

export const persistState = (key, state) => {
  localStorage.setItem(key, JSON.stringify(state[key]))
}

export const clearPersistentState = () => {
  localStorage.clear()
}
