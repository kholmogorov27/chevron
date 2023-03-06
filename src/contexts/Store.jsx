import { useCallback } from 'react'
import createOptimizedContext from './createOptimisedContext'

/*
app modes:
  - default
  - opened
  - searching
*/

class InitialStore {
  constructor() {
    this.mode = 'default',
    this.query = '',
    this.selectedSuggestion = null,
    this.redirected = false,
    this.timestamp = Date.now()
  }
}

const {
  Provider,
  useStateSelector,
  useStore,
} = createOptimizedContext()

function StoreProvider({ children }) {
  return (
    <Provider initialState={new InitialStore}>
      {children}
    </Provider>
  )
}

function useUpdate() {
  const store = useStore()

  return useCallback(partialNewState => {
    const state = store.getState()
    if (state.redirected) return
    
    const newState = { ...state, ...partialNewState }
    
    if ('query' in partialNewState)
      newState.mode = partialNewState.query ? 'searching' : 'default'
    if (newState.mode !== 'searching')
      newState.selectedSuggestion = null

    store.update(newState)
  }, [store])
}

function useReset() {
  const store = useStore()
  return () => store.update({ ...(new InitialStore) })
}

export { StoreProvider, useStateSelector, useUpdate, useReset }