// returns a string with all classes from classes array
function getClasses(...classes) {
  return classes.filter(c => typeof c !== 'boolean').join(' ')
}

export default getClasses