import { useEffect, useState } from "react";

function TransitionController({ show, onTransit, preMount=false, render }) {
  const [shouldRender, setShouldRender] = useState(show)
  
  // will be called when a transition animation is finished
  const onAnimationEnd = () => {
    if (!show) {
      setShouldRender(false)
      onTransit(false)
    }
  }

  useEffect(() => {
    if (show) {
      setShouldRender(true)
      onTransit(true)
    }
  }, [show])

  return (
    preMount
      /*
       if preMount is true the children will mount before it will be shown
       the children must support preMount
      */
       ? render({
          onAnimationEnd: onAnimationEnd, 
          show: show, 
          visibility: shouldRender, 
          // resetting state after every "unmount"
          key: show})
      // mountining at the same time when the children will be shown
      : shouldRender && render({onAnimationEnd: onAnimationEnd, show: show})
  )
}

export default TransitionController