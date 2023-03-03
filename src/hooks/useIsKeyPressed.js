import { useState, useEffect } from 'react'

function useIsKeyPressed(keyName) {
  const [isKeyPressed, setIsKeyPressed] = useState(false)
  
  // listeners
  useEffect(() => {
    document.addEventListener('keydown', e => {
      if (e.key === keyName)
        setIsKeyPressed(true)
    })
    document.addEventListener('keyup', e => {
      if (e.key === keyName)
        setIsKeyPressed(false)
    })
  }, [keyName])

  return isKeyPressed
}

export default useIsKeyPressed