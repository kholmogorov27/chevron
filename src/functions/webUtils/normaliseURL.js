import isValidUrl from './isValidURL'
import ensureProtocol from './ensureProtocol'

function normaliseURL(url) {
  // normalising only valid URLs
  if (!isValidUrl(url)) 
    return null
  
  let urlObj
  try {
    // URLs without a protocol throw errors
    urlObj = new URL(ensureProtocol(url))
  } catch (error) {
    // can't make a new URL
    return null
  }

  return getURLBase(urlObj.hostname)
}

// returns first and second level only domains
function getURLBase(hostname) {
  // get everything except the first level domain
  const noFirstLevelDomain = hostname.slice(0, hostname.lastIndexOf('.'))
  const secondLevelDomainStartPos = noFirstLevelDomain.lastIndexOf('.') + 1
  return hostname.slice(secondLevelDomainStartPos)
}

export default normaliseURL