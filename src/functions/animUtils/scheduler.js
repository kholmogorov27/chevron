//! REMOVE?

function scheduler(animations) {
  /*
    all animations from the array start at the same with the lastest "endPoint" animation
  */
  
  let endPointTimeOffset = 0

  for (const animation of animations) {
    const args = animation.args || []
    setInterval(() => animation.func(...args), endPointTimeOffset)
    
    if (animation.endPoint) {
      const duration = args?.transition?.duration || 0
      endPointTimeOffset += duration
    }
  }
}

export default scheduler