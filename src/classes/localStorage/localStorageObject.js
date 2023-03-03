export default class LocalStorageObject {
  static read(name) {
    return JSON.parse(localStorage.getItem(name))
  }
  static write(name, value) {
    return localStorage.setItem(name, JSON.stringify(value))
  }

  constructor(name, defaultValue) {
    this.name = name
    // define value if it's not defined
    if (localStorage.getItem(this.name) === null || localStorage.getItem(this.name) === undefined)
      localStorage.setItem(this.name, JSON.stringify(defaultValue))
    
    this.object = LocalStorageObject.read(this.name)
  }
  
  // sync localStorage with this.object
  sync() {
    LocalStorageObject.write(this.name, this.object)
  }
}