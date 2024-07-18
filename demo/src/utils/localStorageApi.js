const save = (name, value) => {
  const valueStringified = JSON.stringify(value)
  const key = `${name}-${new Date().toUTCString()}`
  localStorage.setItem(key, valueStringified)
}

const load = (key) => {
  const value = localStorage[key]
  return JSON.parse(value)
}

export default {
  save,
  load,
}
