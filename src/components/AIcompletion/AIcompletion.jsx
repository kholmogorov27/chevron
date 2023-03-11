import { useContext, useEffect, useRef } from 'react'
import { useState } from 'react'
import { SettingsContext } from '../../contexts/Settings'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import createCompletion from '../../chatGPT/createCompletion'

const MESSAGES_PREFIX = { 
  role: 'system', 
  content: 'You are ChatGPT, a large language model trained by OpenAI.\nKnowledge cutoff: 2021-09\nCurrent date and time: ' + new Date().toLocaleString()
}

function AIcompletion({ query, className }) {
  // settings
  const settings = useContext(SettingsContext)
  const enabled = settings.query.AI.enabled
  const apiKey = settings.query.AI.apiKey
  const temperature = settings.query.AI.temperature
  
  const [completion, setCompletion] = useState('')
  const chatLogRef = useRef([])
  
  useEffect(() => {
    if (!enabled) 
      return
    
    let controller = null

    if (query) {
      const currentQuery = { content: query, role: 'user' }
      const messages = [MESSAGES_PREFIX, ...chatLogRef.current, currentQuery ]
      
      controller = createCompletion(
        setCompletion,
        messages,
        temperature,
        apiKey,
        result => chatLogRef.current.push(currentQuery, result)
      )
    }
    else
      setCompletion('')

    return () => controller && controller.abort()
  }, [query, temperature, apiKey, enabled])

  if (!completion || !enabled) 
    return null

  return (
    <div className={className}> 
      <div className='md-container'>
        <ReactMarkdown children={completion}/> 
      </div>
    </div>
  )
}

export default AIcompletion