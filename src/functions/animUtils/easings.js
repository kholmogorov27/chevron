export function easeInQuad (x) {
  return x * x
}
export function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x)
}
export function easeInOutQuad(x) {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2
}

export function easeInOutQuart(x) {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2
}

export function easeInCubic(x) {
  return x * x * x
}
export function easeOutCubic (x) {
  return 1 - Math.pow(1 - x, 3)
}

export function easeOutElastic (x) {
  const c4 = (2 * Math.PI) / 3
  return x === 0
    ? 0
    : x === 1
      ? 1
      : Math.pow(2, -12.5 * x) * Math.sin((x * 7.5 - 0.75) * c4) + 1
}

export function easeInBack(x) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  
  return c3 * x * x * x - c1 * x * x
}