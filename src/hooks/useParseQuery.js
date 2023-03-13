import { useContext, useMemo, useRef } from 'react'
import useIsKeyPressed from './useIsKeyPressed'
import { SettingsContext , ColorSchemeContext} from '../contexts/Settings'
import ParsedQuery from '../classes/parsedQuery'

function useParseQuery(value, type='query', origin, persist=false) {
  /* settings */
  const settings = useContext(SettingsContext)
  const engine = window.CONFIG.engines[settings.general.searchEngine]
  const forceSearchEngineOnCtrl = settings.query.forceSearchEngineOnCtrl
  // ---

  // color scheme
  const colorScheme = useContext(ColorSchemeContext)

  const isCtrlPressed = useIsKeyPressed('Control')
  const forceUseSearchEngine = forceSearchEngineOnCtrl && isCtrlPressed
  
  const parsedQuery = useMemo(() => new ParsedQuery(value, type, origin, engine, colorScheme, forceUseSearchEngine), [value, type, origin, engine, colorScheme, forceUseSearchEngine])
  
  const persistedRef = useRef(parsedQuery)
  if (!persist)
    persistedRef.current = parsedQuery

  return [persistedRef.current, isCtrlPressed]
}

export default useParseQuery