// non "keypressable" keys which have some actions
const activeKeys = new Map([
  ['QueryField', new Set([
    'Backspace', 
    'ArrowRight', 
    'ArrowLeft'
  ])],
  ['Suggestions', new Set([
    'ArrowUp', 
    'ArrowDown'
  ])]
])

// allowed modes for query field functionality
const allowedModes = new Map([
  ['QueryField', new Set([
    'default', 
    'searching'
  ])],
  ['Chevron', new Set([
    'default',
    'opened'
  ])],
  ['Suggestions', new Set([
    'searching'
  ])],
  ['Slider', new Set([
    'opened'
  ])]
])

export { activeKeys, allowedModes }