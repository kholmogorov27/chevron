export default class MiniStore {
  #subscriptions = []
  #state

  constructor(initialState) {
    this.#state = initialState
  }

  getState = () => {
    return this.#state
  }

  update = (newState) => {
    this.#state = newState

    this.#subscriptions.forEach(cb => cb())
  }

  subscribe = cb => {
    this.#subscriptions.push(cb)

    return () => {
      const index = this.#subscriptions.indexOf(cb)

      if (index === -1)
        return

      this.#subscriptions.splice(index, 1)
    }
  }
}