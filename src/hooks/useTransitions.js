import { useEffect, useRef } from 'react'

function useTransitions(state, options, visibility=true) {
  const _state = String(state)
  const prevState = useRef('null')
  const currentTransition = useRef({
    called: true,
    _func: null,
    set func(value) {
      if (value !== this._func) {
        this._func = value
        this.called = false
      }
    },
    fire() {
      if (!this.called) {
        this._func()
        this.called = true
      }
    }
  })

  useEffect(() => {
    /*
      transition types:
      - no-anim: neither named nor "any" animation was found
      - any: "any" animation was played
      - named: named animation was played
    */

    // if it's not the same state and state animations defined
    if (prevState.current !== _state && options.transitions[_state]) {
      // if animations from previous state defined
      if (typeof options.transitions[_state][prevState.current] === 'function') {
        currentTransition.current.func = options.transitions[_state][prevState.current]
      // if animations from any previous state defined
      } else if (typeof options.transitions[_state].any === 'function') {
        currentTransition.current.func = options.transitions[_state].any
      }
    }
    
    // fire animation if the element is visible
    visibility && currentTransition.current.fire()
    
    // for the next execution
    prevState.current = _state
  }, [_state, visibility, options.transitions])

  useEffect(() => {
    visibility 
      ? options?.visibility?.show?.call() 
      : options?.visibility?.hide?.call()
  }, [visibility, options?.visibility])
}

export default useTransitions