import { useContext, useEffect, useState, useRef } from 'react'
import { ColorSchemeContext, SettingsContext, ThemeContext } from './contexts/Settings'
import { useReset, useStateSelector, useUpdate } from './contexts/Store'
import { AnimatePresence, motion} from 'framer-motion'
import ActiveElements from './components/ActiveElements/ActiveElements'
import QueryField from './components/QueryField/QueryField'
import Settings from './components/Settings/Settings'
import LayoutButton from './components/LayoutButton/LayoutButton'
import { BsGearFill, BsChevronRight } from 'react-icons/bs'
import { RiMenu5Fill } from 'react-icons/ri'
import { allowedModes } from './rules'
import { isMobile } from 'react-device-detect'
import classes from './App.module.css'
import './App.css'

const ignoreMobile = localStorage.getItem('ignoreMobile')

function App() {
  // settings
  const settings = useContext(SettingsContext)
  // theme
  const theme = useContext(ThemeContext)
  // color scheme
  const colorScheme = useContext(ColorSchemeContext)

  /* store */
  const mode = useStateSelector(state => state.mode)
  const redirected = useStateSelector(state => state.redirected)
  const timestamp = useStateSelector(state => state.timestamp)
  const updateStore = useUpdate()
  const resetStore = useReset()
  // ---

  const [showSettings, setShowSettings] = useState(false)
  const [showReset, setShowReset] = useState(false)

  /* handlers */
  const onContextMenuRef = useRef(null)
  const onKeyUpRef = useRef(null)
  const onKeyDownRef = useRef(null)

  function switchMacrosMenu() {
    if (mode === 'default')
      updateStore({ mode: 'opened' })
    else if (mode === 'opened')
      updateStore({ mode: 'default' })
  }

  onKeyUpRef.current = e => {
    if (e.key === 'Shift')
      if (allowedModes.get('Chevron').has(mode))
        if (mode === 'opened')
          updateStore({ mode: 'default' })
  }
  onKeyDownRef.current = e => {
    if (e.key === 'Shift')
        if (allowedModes.get('Chevron').has(mode))
          if (mode === 'default')
            updateStore({ mode: 'opened' })
  }
  onContextMenuRef.current = e => {
    switchMacrosMenu()
    e.preventDefault()
  }
  // ---

  // adding event listeners
  useEffect(() => {
    const onContextMenu = e => onContextMenuRef.current(e)
    const onKeyUp = e => onKeyUpRef.current(e)
    const onKeyDown = e => onKeyDownRef.current(e)

    document.addEventListener('keyup', onKeyUp)
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('contextmenu', onContextMenu)
    return () => {
      document.removeEventListener('keyup', onKeyUp)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('contextmenu', onContextMenu)
    }
  }, [])

  /* setting document title */
  useEffect(() => {
    document.title = settings.general.tabTitle
  }, [settings.general.tabTitle]) 
  // ---

  /* setting theme variables */
  useEffect(() => {
    const root = document.documentElement
    for (const variable in theme)
      root.style.setProperty('--' + variable, theme[variable])
  }, [theme]) 
  // ---

  /* setting color scheme variables */
  useEffect(() => {
    document.body.setAttribute('data-color-scheme', colorScheme)
  }, [colorScheme]) 
  // ---

  /* firefox history back caching fix [#1 issue] */
  const handleVisibilityChange = useRef(null)
  handleVisibilityChange.current = () => {
    // reset store if user went back from a redirected page
    if (document.visibilityState === 'visible' && redirected)
      setShowReset(true)
  }
  useEffect(() => {
    document.addEventListener('visibilitychange', () => handleVisibilityChange.current())
  }, [])
  // ---

  return (
    <div className='app'>
      {
        !isMobile || ignoreMobile
          ? <AnimatePresence>
              {
                showSettings
                  ? <Settings key='settings' onClose={() => {
                    setShowSettings(false) 
                    resetStore()}}/>
                  : 
                  <motion.div 
                    key={timestamp}
                    className={classes['container']} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={redirected || { opacity: 0 }}>
                      <ActiveElements/>
                      <QueryField/>
                      <LayoutButton
                        id='settings'
                        style={{ right: 0, top: 0 }}
                        onClick={() => setShowSettings(state => !state)}>
                          <BsGearFill/>
                      </LayoutButton>
                      <LayoutButton
                        id='macros-menu'
                        style={{ right: 0, bottom: 0 }}
                        onClick={switchMacrosMenu}>
                          {
                            mode === 'default' && <RiMenu5Fill/>
                          }
                          {
                            mode === 'opened' && <BsChevronRight/>
                          }
                      </LayoutButton>
                      {
                        showReset && <div className={classes['cancel-button']} onClick={() => location.reload()}>Cancel</div>
                      }
                  </motion.div>
              }
            </AnimatePresence>
          : <div className={classes['mobile-warning']}>
              <div>
                Mobile devices are not supported :( <br />
                <span className={classes['ignore-mobile-button']}
                onClick={() => {
                  localStorage.setItem('ignoreMobile', true)
                  location.reload()
                }}>
                  ignore this warning
                </span>
              </div>
            </div>
      }
    </div>
  )
}

export default App
