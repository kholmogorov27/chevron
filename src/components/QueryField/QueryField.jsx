import { useContext, useCallback, useEffect, memo, forwardRef } from 'react'
import useSuggestions from '../../hooks/useSuggestions'
import useParseQuery from '../../hooks/useParseQuery'
import useRedirect from '../../hooks/useRedirect'
import { SettingsContext } from '../../contexts/Settings'
import { useStateSelector, useUpdate } from '../../contexts/Store'
import Suggestions from '../Suggestions/Suggestions'
import { allowedModes, activeKeys } from '../../rules'
import googleAutocomplete from '../../autocomplete/googleAutocomplete'
import History from '../../classes/localStorage/history'
import gC from '../../functions/generationUtils/getClasses'
import classes from './QueryField.module.css'

const QueryField = forwardRef((props, inputRef) => {
  // settings
  const settings = useContext(SettingsContext)

  const searchHistory = settings.general.searchHistory
  const inputFontSize = settings.query.field.fontSize
  const suggestionsFontSize = settings.query.suggestions.fontSize
  const enableCarret = settings.query.field.caret

  /* store */
  const mode = useStateSelector(store => store.mode)
  const query = useStateSelector(store => store.query)
  const selectedSuggestion = useStateSelector(store => store.selectedSuggestion)
  const updateStore = useUpdate()
  // ---
  
  // suggestions
  const suggestions = useSuggestions(query, googleAutocomplete)
  
  // parse query
  const [parsedQuery] = useParseQuery(
    selectedSuggestion ? selectedSuggestion.suggestion : query,
    selectedSuggestion ? selectedSuggestion.type : undefined, 
    query)

  const redirect = useRedirect()
    
  const handleRedirect = useCallback(() => {
    if (searchHistory)
      // memorise only non generated queries
      if (parsedQuery._type === 'query')
        History.add({ id: parsedQuery.value, type: parsedQuery._type })
  
    redirect(parsedQuery.url, 'main')
  }, [parsedQuery, searchHistory, redirect])

  const handleQueryChange = useCallback(value => {
    if (allowedModes.get('QueryField').has(mode))
      updateStore({ 
        //!
        query: value.replace(/\s{2,}/g, ' '), 
        selectedSuggestion: null
      })
  }, [mode, updateStore])

  const onKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'Enter':
        if (allowedModes.get('QueryField').has(mode)) {
          // redirecting
          handleRedirect()
          // preventing typing enter in the field
          e.preventDefault()
        }
        break
      case 'Escape':
        // clearing the query
        updateStore({ query: '' })
        break
      default:
        if (allowedModes.get('Suggestions').has(mode) && activeKeys.get('Suggestions').has(e.key)) {
          switch (e.key) {
            case 'ArrowUp':
              updateStore({ selectedSuggestion: getSuggestion(suggestions, selectedSuggestion, 'prev') })
              break
            case 'ArrowDown':
              updateStore({ selectedSuggestion: getSuggestion(suggestions, selectedSuggestion, 'next') })
              break
          }
          e.preventDefault()
        }
    }
  }, [mode, updateStore, handleRedirect, suggestions, selectedSuggestion])

  // add event listeners
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)    
  }, [onKeyDown])

  // re-focusing the input inputField to focus on the caret
  useEffect(() => {
    inputRef.current.blur()
    inputRef.current.focus()
  }, [inputRef])
  
  // css variables
  const variables = {
    '--font-size': inputFontSize + 'em',
    '--font-size-suggestions': suggestionsFontSize + 'em'
  }

  const input = <input 
    ref={inputRef}
    value={parsedQuery.value}
    onBlur={e => setTimeout(() => e.target.focus(), 0)}
    className={gC(classes['field'], !selectedSuggestion && classes['selected'])}
    onChange={e => handleQueryChange(e.target.value)}
    style={{
      // hide when query is empty
      opacity: parsedQuery.value ? 1 : 0,
      caretColor: enableCarret ? undefined : 'transparent'}}/>

  return (
    <div
      className={`${classes['container']}`} 
      style={ variables }>
        { input }
        { parsedQuery.value && <Suggestions
            queryMode={settings.appearance.style}
            buttonMode={settings.appearance.style}
            suggestions={suggestions}
            selectedSuggestion={selectedSuggestion}
            onRedirect={handleRedirect}
            setSelected={suggestion => updateStore({ selectedSuggestion: suggestion })}/> }
    </div>
  )
})
QueryField.displayName = 'QueryField'

function getSuggestion(suggestions, selectedSuggestion, option) {
  // current index
  const currentIndex = suggestions.indexOf(selectedSuggestion)

  // new index
  let newIndex = null
  if (typeof option === 'number') {
    newIndex = option
  } else if (option === 'next') {
    newIndex = currentIndex + 1
  } else if (option === 'prev') {
    newIndex = (currentIndex === -1 ? suggestions.length : currentIndex) - 1
  } else {
    throw new Error('unknown option')
  }

  // if the index is out of the range
  if (newIndex < 0 || newIndex >= suggestions.length)
    return null

  // return new suggestion
  return suggestions[newIndex]
}

export default memo(QueryField)