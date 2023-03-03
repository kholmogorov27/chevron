function isValidUrl(url) {
  // eslint-disable-next-line no-useless-escape
  const regex = new RegExp(/^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/)

  if (url.match(regex)) return true
  return false
}

export default isValidUrl