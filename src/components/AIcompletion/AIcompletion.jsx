import { useContext, useEffect } from 'react'
import { useState } from 'react'
import { SettingsContext } from '../../contexts/Settings'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import createCompletion from '../../chatGPT/createCompletion'

function AIcompletion({ query, className }) {
  // settings
  const settings = useContext(SettingsContext)
  const enabled = settings.query.AI.enabled
  const apiKey = settings.query.AI.apiKey
  const temperature = settings.query.AI.temperature
  
  const [state, setState] = useState('')
  
  useEffect(() => {
    if (!enabled) 
      return
    
    let controller = null

    if (query)
      controller = createCompletion(setState, query, temperature, apiKey)
    else
      setState('')

    return () => controller && controller.abort()
  }, [query, temperature, apiKey, enabled])

  if (!state || !enabled) 
    return null

  return (
    <div className={className}> 
      <div className='md-container'>
        <ReactMarkdown children={state}/> 
      </div>
    </div>
  )
}

export default AIcompletion