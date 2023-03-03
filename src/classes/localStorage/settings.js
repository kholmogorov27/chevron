import LocalStorageObject from './localStorageObject'

export default class Settings extends LocalStorageObject {
  static objectName = 'settings'
  static get initialState() {
    return {}
  }
  
  constructor() {
    super(Settings.objectName, Settings.initialState)
  }

  set(newSettings) {
    this.object = newSettings
    this.sync()
  }
}