import pseudoHash from '../dataUtils/pseudoHash'

const BIT_MASK = 0b111111 // get the first N bits (64 numbers in total [0, 63])
const RANGE_SIZE_MODIFIER = -10 // expands/reduces the range
const RANGE_ALIGMENT = Math.floor((100 - ((BIT_MASK + 1) + RANGE_SIZE_MODIFIER)) / 2)

function randomHSLColor(input, dark=false, stringFormat=true) {
  if (typeof input === 'string') {
    input = pseudoHash(input)
  }
  // use golden angle approximation
  const hue = input * 137.508
  const saturation =
    (input & BIT_MASK)
    + RANGE_SIZE_MODIFIER // exclude 10 numbers [0, 53]
    + RANGE_ALIGMENT // align the range in [0, 100]

  let lightness = 70
  if (dark) lightness = 40
  
  return stringFormat 
    ? `hsl(${hue},${saturation}%,${lightness}%)`
    : [hue, saturation, lightness]
}

export default randomHSLColor