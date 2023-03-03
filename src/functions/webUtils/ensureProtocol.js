function ensureProtocol(url, protocol='https') {
  if (url.startsWith('https://') || url.startsWith('http://')) {
    return url
  } else {
    return protocol + '://' + url
  }
}

export default ensureProtocol