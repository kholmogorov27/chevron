function camelCaseToTitle(input, capitalize) {
  // split words
  let result = input.replace(/([A-Z])/g, " $1")
  result = result.toLowerCase()
  // capitalize the first word
  if (capitalize) {
    result = result.charAt(0).toUpperCase() + result.slice(1)
  }

  return result
}

export default camelCaseToTitle