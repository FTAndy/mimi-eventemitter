module.exports = MimiEventEmitter

function MimiEventEmitter() {
  this.listeners = new Map()
  this.maxListeners = 10

  this.addListener = (eventName, fn) => {
    addListener(eventName, fn, "append")
  }

  this.on = this.addListener

  this.emit = (eventName, ...args) => {
    trigger(eventName, ...args)
  }

  this.eventNames = () => {
    const keys = []
    for (const key of this.listeners.keys()) {
      keys.push(key)
    }
    return keys
  }

  this.getMaxListeners = () => {
    return this.maxListeners
  }

  this.listenerCount = (eventName) => {
    return this.listeners.get(eventName).length
  }

  this.listeners = (eventName) => {
    return this.listeners.get(eventName)
  }

  this.once = (eventName, fn) => {

  }

  this.prependListener = (eventName, fn) => {
    addListener(eventName, fn, "prepend")
  }

  this.prependOnceListener = (eventName, fn) => {

  }

  this.removeAllListeners = (eventNames) => {

  }

  this.removeListener = (eventName, fn) => {
    removeListener(eventName, fn)
  }

  this.setMaxListeners = (n) => {
    this.maxListeners = n
  }

  const getListener = (eventName) => {

  }

  const addListener = (eventName, fn, method) => {

  }

  const removeListener = (eventName, fn) => {

  }

  const trigger = (event, ...args) => {

  }

  const getAccount = (eventName) => {

  }

  const once = (eventName, fn) => {

  }
}
