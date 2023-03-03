import { createContext, useEffect, useState } from 'react'
import useColorSchemeDetector from '../hooks/useColorSchemeDetector'
import assignDeep from 'assign-deep'
import settings from '../../settings/settings'
import LocalSettings from '../classes/localStorage/settings'

const localSettigns = new LocalSettings()
const assignedSettings = assignDeep(settings.defaults, localSettigns.object)

export const SettingsContext = createContext(null)
export const SetSettingsContext = createContext(null)
export const ThemeContext = createContext(null)
export const ColorSchemeContext = createContext(null)

export default function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(assignedSettings)

  const activeTheme = settings.appearance.activeTheme
  const systemColorScheme = useColorSchemeDetector()
  const colorScheme = settings.appearance.colorScheme === 'auto' 
    ? systemColorScheme
    : settings.appearance.colorScheme
  const theme = settings.appearance.themes[activeTheme][colorScheme]

  // sync settings with localStorage
  useEffect(() => {
    localSettigns.set(settings)
  }, [settings])

  // sync JOY UI color scheme
  useEffect(() => {
    localStorage.setItem('joy-mode', colorScheme)
  }, [colorScheme])

  return (
    <SettingsContext.Provider value={settings}>
      <SetSettingsContext.Provider value={setSettings}>
        <ThemeContext.Provider value={theme}>
          <ColorSchemeContext.Provider value={colorScheme}>
            {children}
          </ColorSchemeContext.Provider>
        </ThemeContext.Provider>
      </SetSettingsContext.Provider>
    </SettingsContext.Provider>
  )
}