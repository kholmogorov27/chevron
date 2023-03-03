export function getPropertyByPath(obj, path) {
  if (typeof obj !== 'object' || !path) return obj
  const pathArray = path.split('.')
  for (let i=0; i < pathArray.length; i++){
      obj = obj?.[pathArray[i]]
  }
  return obj
}
export function setPropertyByPath(obj, path, value) {
  if (typeof obj !== 'object' || !path) return obj
  const pathArray = path.split('.')
  let i=0
  for (; i < pathArray.length-1; i++){
      obj = obj?.[pathArray[i]]
  }
  obj[pathArray[i]] = value
}