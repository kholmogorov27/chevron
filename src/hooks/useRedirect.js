import { useCallback, useContext } from 'react'
import { SettingsContext } from '../contexts/Settings'
import { useUpdate } from '../contexts/Store'
import ensureProtocol from '../functions/webUtils/ensureProtocol'

function useRedirect() {
  // settings
  const settings = useContext(SettingsContext)
  const target = settings.general.redirectTarget
  const quickRedirect = settings.general.quickRedirect

  const updateValue = useUpdate()
  
  const redirectCallback = useCallback((url, animationEndCallback, ignoreAnimation=false) => {
    if (!animationEndCallback) throw new Error('`animationEndCallback` is not defined')

    // block the store
    updateValue({ redirected: true })

    if (quickRedirect || ignoreAnimation)
      openLink(url, target)
    else
      window[animationEndCallback + 'RedirectAnimationEnd'] = () => openLink(url, target)
  }, [updateValue, quickRedirect, target])

  return redirectCallback
}

function openLink(url, target) {
  window.open(ensureProtocol(url), target)
}

export default useRedirect