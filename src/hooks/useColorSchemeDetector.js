import { useSyncExternalStore } from 'react'

const query = window.matchMedia("(prefers-color-scheme: dark)")

const useColorSchemeDetector = () => {
  return useSyncExternalStore(
    // subscriber
    listener => {
      query.addEventListener('change', listener)
      return () => query.removeEventListener('change', listener)
    },
    // listener
    () => query.matches ? 'dark' : 'light'
  )
}

export default useColorSchemeDetector