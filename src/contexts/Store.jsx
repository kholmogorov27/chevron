import { useCallback } from 'react'
import createOptimizedContext from './createOptimisedContext'

/*
app modes:
  - default
  - opened
  - searching
*/

const initialStore = {
  mode: 'default',
  query: '',
  selectedSuggestion: null,
  redirected: false
}

const {
  Provider,
  useStateSelector,
  useStore,
} = createOptimizedContext()

function StoreProvider({ children }) {
  return (
    <Provider initialState={initialStore}>
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
  return () => store.update({ ...initialStore })
}

export { StoreProvider, useStateSelector, useUpdate, useReset }