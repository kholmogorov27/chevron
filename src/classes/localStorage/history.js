import LocalStorageObject from './localStorageObject'
import MiniSearch from 'minisearch'

export default class History extends LocalStorageObject {
  static objectName = 'history'
  static get initialState() {
    return []
  } 
  // limit of entries
  static limit = 5000
  static add(query) {
    const history = LocalStorageObject.read(History.objectName)

    // if the quary is alredy in the list
    if (history.find(entry => entry.id === query.id))
      return

    // remove the last element if the limit exceeded
    if (history.length >= History.limit)
      history.pop()

    history.unshift(query)

    LocalStorageObject.write(History.objectName, history)
  }

  #miniSearch

  constructor() {
    super(History.objectName, History.initialState)
    this.#miniSearch = new MiniSearch({ fields: ['id'] })
    this.#syncMiniSearch()
  }

  suggest(query) {
    const result = this.#miniSearch.search(query, {
      prefix: term => term.length > 3, 
      fizzy: 0.2,
      combineWith: 'AND'
    })
    for(const suggestion of result) {
      suggestion.relevance = suggestion.score * 1000
      suggestion.suggestion = suggestion.id
    }

    return result
  }

  sync() {
    super.sync()
    this.#syncMiniSearch()
  }

  #syncMiniSearch() {
    this.#miniSearch.removeAll()
    this.#miniSearch.addAll(this.object)
  }
}