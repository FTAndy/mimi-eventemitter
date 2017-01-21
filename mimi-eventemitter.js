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
    return this.listeners.get(eventName) || []
  }

  const addListener = (eventName, fn, method) => {
    if (typeof fn !== "function")
      throw new Error("Handler must be a function")
    if (!["prepend", "append"].includes(method))
      throw new Error("method must be 'prepend' or 'append'")

    if (this.listeners.has(eventName)) {
      switch (method) {
        case "prepend":
          this.listeners.get(eventName).unshift(fn)
          break;
        case "append":
          this.listeners.get(eventName).unshift(fn)
          break;
      }
    } else {
      this.listeners.set(eventName, [])
    }
  }

  const removeListener = (eventName, fn) => {
    if (typeof fn !== "function")
      throw new Error("Handler must be a function")

    if (this.listeners.has(eventName)) {
      const events = this.listeners.get(eventName)
      let index = events.indexOf(fn)
      if (index === -1)
        return
      events.splice(index, 1)
      index = events.indexOf(fn)
      if (index !== -1)
        removeListener(eventName, fn)
      if (events.length === 0)
        this.listeners.delete(eventName)
    }
  }

  const trigger = (eventName, ...args) => {
    if (this.listeners.has(eventName)) {
      const events = this.listeners.get(eventName)
      for (let i = 0; i < this.listeners.get(eventName).length; i += 1) {
        events[i](...args)
      }
    }
  }

  const getAccount = (eventName) => {
    return this.listeners.get(eventName).length
  }

  const once = (eventName, fn, method) => {
    addListener(eventName, (...args) => {
      removeListener(eventName, fn)
      fn(...args)
    }, method)
  }
}
