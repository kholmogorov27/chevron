export default function fetchFromScriptTag(url, callbackName) {
  return new Promise(resolve => {
    // creating script node
    const script = document.createElement('script')
    document.querySelector('head').appendChild(script)
    script.src = url
    
    // resolve callback
    window[callbackName] = res => {
      resolve(res)
      // clean up
      script.remove()
    }
  })
}