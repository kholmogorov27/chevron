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
import styles from './App.module.css'
import './App.css'

function App() {
  // settings
  const settings = useContext(SettingsContext)
  // theme
  const theme = useContext(ThemeContext)
  // color scheme
  const colorScheme = useContext(ColorSchemeContext)

  /* store */
  const mode = useStateSelector(state => state.mode)
  const updateStore = useUpdate()
  const resetStore = useReset()
  // ---

  const [showSettings, setShowSettings] = useState(false)

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

  return (
    <div className='app'>
      <AnimatePresence>
        {
          showSettings
            ? <Settings key='settings' onClose={() => {
              setShowSettings(false) 
              resetStore()}}/>
            : 
            <motion.div 
              key='container'
              className={styles['container']} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}>
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
            </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

export default App
