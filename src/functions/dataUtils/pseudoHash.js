function pseudoHash(str) {
  let result = 0
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i)
  }
  return result
}

export default pseudoHash