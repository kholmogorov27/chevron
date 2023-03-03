import { useState, useCallback, useRef, useEffect, useContext } from 'react'
import { SettingsContext } from '../contexts/Settings'
import History from '../classes/localStorage/history'
import axios from 'axios'
import copyObj from '../functions/dataUtils/copyObj'
import currencyCodes from '../currencies'

const HIGHEST_RELEVANCE = 5000
// the hierarchy of suggestion types: the lower index - the more higher in the hierarchy
const hierarchy = ['currency', 'history', 'autocomplete']

// search history
const history = new History()

function useSuggestions(query, autoCompleteEngine) {
  // settings
  const settings = useContext(SettingsContext)

  const locale = settings.general.locale
  const autocompleteLimit = settings.query.suggestions.autocompleteLimit
  const historyLimit = settings.query.suggestions.historyLimit
  const searchHistory = settings.general.searchHistory

  const [suggestions, setSuggestions] = useState([])
  const addSuggestions = useCallback((suggestions, source) => {
    // if suggestions are empty
    if (suggestions.length === 0)
      return
    
    // set source
    suggestions.forEach(suggestion => suggestion.source = source)
    
    setSuggestions(state => {
      const newState = copyObj(state)
      // remove duplicates
      for (let i=0; i < newState.length; i++) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const oldSuggestion = newState[i]
          const occurrenceIndex = suggestions.findIndex(newSuggestion => newSuggestion.suggestion === oldSuggestion.suggestion)
          // break if no occurrencies were found
          if (occurrenceIndex === -1) break

          const newSuggestion = suggestions[occurrenceIndex]
          // if the new suggestion is higher in the hierarchy than the old one
          if (hierarchy.indexOf(newSuggestion.type) > hierarchy.indexOf(oldSuggestion.type)) {
            // delete the old suggestion
            newState.splice(i, 1)
            break
          } else {
            // delete the new suggestion
            suggestions.splice(occurrenceIndex, 1)
          }
        }
      }
      // push new suggestions
      newState.push(...suggestions)
      // sort by relevance
      newState.sort((a, b) => b.relevance - a.relevance)

      return newState
    })
  }, [])
  
  const queryRef = useRef()
  queryRef.current = query

  useEffect(() => {
    // if query is empty
    if (!query) return
    
    // reset state
    setSuggestions([])

    /* autocomplete section */
    autoCompleteEngine(query, locale).then(suggestions => {
      // if the suggestions are outdated
      if (query !== queryRef.current) return
      addSuggestions(suggestions.slice(0, autocompleteLimit), 'autocomplete')
    })
    // ---

    /* history section */
    if (searchHistory)
      addSuggestions(history.suggest(query).slice(0, historyLimit), 'history')
    // ---

    /* currency section */
    if (currencyCommonRegex.test(query))
      fetchCurrency(query).then(response => {
        // if the suggestions are outdated
        if (query !== queryRef.current) return
        response && addSuggestions([response], 'currency')
      })
    // ---
    
  }, [query, searchHistory, autoCompleteEngine, autocompleteLimit, historyLimit, addSuggestions, locale])

  return suggestions
}

// currency regex
const currencyCommonRegex = new RegExp(/^(?:[+-]?([0-9]*[.])?[0-9]+\s)?\b[a-zA-Z]{3}\b \bto\b \b[a-zA-Z]{3}\b/i)
const currencyAmountRegex = new RegExp(/[+-]?([0-9]*[.])?[0-9]+/gi)
const currencyCodeRegex = new RegExp(/[a-zA-Z]{3}/gi)
async function fetchCurrency(query) {
  const amount = query.match(currencyAmountRegex),
        codes = query.match(currencyCodeRegex),
        from = codes[0].toUpperCase(),
        to = codes[1].toUpperCase()

  if (currencyCodes.includes(from) && currencyCodes.includes(to)) {
    const response = await axios.get(
      'https://api.exchangerate.host/convert', 
      { params: { from, to, amount } })
    const { data } = response
    
    if (data.success && data.result)
      return ({
        suggestion: `${Math.round((data.result + Number.EPSILON) * 100) / 100} ${to}`,
        type: 'currency',
        relevance: HIGHEST_RELEVANCE
      })
      
    return null
  }
}

export default useSuggestions