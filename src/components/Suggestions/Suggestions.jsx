import { forwardRef, useRef } from 'react'
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed'
import { TbCurrencyDollar, TbEqual } from 'react-icons/tb'
import gC from '../../functions/generationUtils/getClasses'
import classes from './Suggestions.module.css'

const prefixes = {
  currency: <TbCurrencyDollar strokeWidth='.1em'/>,
  calculator: <TbEqual strokeWidth='.1em'/>
}

function Suggestions({ suggestions, selectedSuggestion, queryMode, buttonMode, onRedirect, setSelected }) {
  return (
    <div 
      className={gC(classes['container'], classes[queryMode])}>
      { suggestions.map((suggestion, index) => 
        <Suggestion 
          key={suggestion.suggestion + index} 
          suggestion={suggestion}
          selected={suggestion === selectedSuggestion}
          queryMode={queryMode}
          buttonMode={buttonMode}
          onClick={onRedirect} 
          setSelected={setSelected}/>) 
      }
    </div>
  )
}

const Suggestion = forwardRef(({ suggestion, selected, queryMode, buttonMode, onClick, setSelected }, ref) => {
  const mouseMoved = useRef(false)

  function handleMouseMove() {
    mouseMoved.current = true
    // select only if it wasn't selected before
    if (!selected) setSelected(suggestion)
  }

  function handleMouseLeave() {
    // only if mouse moved (to prevent non-user triggers)
    if (mouseMoved.current) setSelected(null)
  }

  const commonProps = {
    ref,
    className: gC(
      classes['suggestion'],
      classes[suggestion.source + '-source'],
      classes[buttonMode],
      selected && classes['selected']),
    onClick
  }

  const prefix = prefixes[suggestion.type]
    ? <div className={classes['prefix']}>{prefixes[suggestion.type]}</div>
    : null

  switch (queryMode) {
    case 'default': return (
      <ScrollIntoViewIfNeeded 
        {...commonProps}
        active={selected}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}>
          <div>{prefix}{suggestion.suggestion}</div>
      </ScrollIntoViewIfNeeded>
    )
    default: throw new Error('unknown queryMode: ' + queryMode)
  }
})
Suggestion.displayName = 'Suggestion'

export default Suggestions