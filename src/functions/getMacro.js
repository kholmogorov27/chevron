function getMacro(query, normalisedURL=null) {
  // searching for a macro by url
  if (normalisedURL) {
    for (const macro of window.CONFIG.macros) {
      // comparing query url and current macro url
      if (normalisedURL === macro.normalisedURL) {
        return {options: macro, command: null}
      }
    }
  } else {
    // searching for a macro by triggers
    for (const macro of window.CONFIG.macros) {
      // iterating through triggers
      for (const trigger of macro.triggers) {
        // query must be equal to a trigger or ends with a command 
        if (query.startsWith(trigger)) {
          // query is equal to the trigger
          if (query === trigger) {
            return {options: macro, command: null}
          }
          else {
            const command = getCommand(query.slice(trigger.length))
            // if a command is found
            if (typeof macro.commands === 'object' && command) {
              // if the command is defined in the macro
              if (Object.prototype.hasOwnProperty.call(macro.commands, command.type))
                return {options: macro, command}
            }
          }
        }
      }
    }
  }

  // macro wasn't found
  return null
}

function getCommand(query) {
  let foundCommand = null

  // sorting commands to don't skip a command which starts the same as an another command
  const sortedCommands = window.CONFIG.commands.sort((a, b) => a.trigger.length > b.trigger.length)

  for (const command of sortedCommands)
    // if it's a command
    if (query.startsWith(command.trigger))
      foundCommand = {
        ...command,
        // the rest is arguments
        args: query.slice(command.trigger.length)}

  return foundCommand
}

export default getMacro