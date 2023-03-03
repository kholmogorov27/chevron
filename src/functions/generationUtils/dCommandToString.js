function dCommandToString(command, args, scale=1) {
  let result = command
  for (let i = 0; i < args.length; i++) {
    result += i !== 0 ? ',' : ''
    result += (args[i] * scale)
  }
  return result
}

export default dCommandToString