import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import MiniStore from '../classes/miniStore'

export default function createOptimizedContext() {
  const Context = createContext(null)

  const Provider = ({ initialState, children }) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const store = useMemo(() => new MiniStore(initialState), [])

    return <Context.Provider value={store}>{children}</Context.Provider>
  }

  const useStore = () => {
    const store = useContext(Context)
    if (!store)
      throw new Error("Can not use `useStore` outside of the `Provider`")

    return store
  }

  const useStateSelector = selector => {
    const store = useStore()
    const [state, setState] = useState(() => selector(store.getState()))
    const selectorRef = useRef(selector)
    const stateRef = useRef(state)

    useLayoutEffect(() => {
      selectorRef.current = selector
      stateRef.current = state
    })

    useEffect(() => {
      return store.subscribe(() => {
        const state = selectorRef.current(store.getState())

        if (stateRef.current === state)
          return

        setState(state)
      })
    }, [store])

    return state
  }

  return { Provider, useStateSelector, useStore }
}
