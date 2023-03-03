import { memo, useState } from 'react'
import { useStateSelector } from '../../contexts/Store'
import Chevron from '../Chevron/Chevron'
import QuickLook from '../QuickLook/QuickLook'

const getElement = mode => {
  switch(mode) {
    case null:
    case 'opened':
    case 'default':
      return 'Chevron'
    case 'searching':
      return 'QuickLook'
    default: throw new Error('Unknown mode: ' + mode)
  }
}

function ActiveElements() {
  // mode
  const mode = useStateSelector(store => store.mode)
  // current element
  const [currentElement, setCurrentElement] = useState(getElement(mode))

  function handleAnimationEnd() {
    setCurrentElement(getElement(mode))
  }

  return (
    <>
      <Chevron
        visibility={currentElement === 'Chevron'}
        onAnimationEnd={handleAnimationEnd}
        />
      <QuickLook
        visibility={currentElement === 'QuickLook'}
        onAnimationEnd={handleAnimationEnd}
        />
    </>
  )
}

export default memo(ActiveElements)