const API_URL = 'https://api.openai.com/v1/chat/completions'
const PARAMS = {
    model: 'gpt-3.5-turbo',
    temperature: 0.4,
    stream: true,
    // max_tokens: 4096,
    // frequency_penalty: 1.0,
}

function createCompletion(stateSetter, messages, temperature, key) {
  const controller = new AbortController()
  
  return ({ 
    controller,
    promise: new Promise((resolve, reject) => {
      fetch(API_URL, {
        signal: controller.signal,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(key)
        },
        body: JSON.stringify({ ...PARAMS, messages, temperature })
      })
      .then(result => {
        fetchStream(
          result.body, 
          result.ok ? dataParser(stateSetter) : errorParser)
        .then(content => {
          result.ok
            ? resolve({ content, role: 'assistant' })
            : reject(content)
        })
      })
    })
  })
}

function fetchStream(stream, parser) {
  let content = null
  const reader = stream.getReader()

  // read() returns a promise that resolves
  // when a value has been received
  return reader.read().then(
    function processText({ done, value }) {
      // Result objects contain two properties:
      // done  - true if the stream has already given you all its data.
      // value - some data. Always undefined when done is true.
      if (done)
        return content
      
      const decoded = new TextDecoder('utf-8').decode(value)
      console.log(decoded)

      content = parser(decoded, content)

      return reader.read().then(processText)
    }
  )
}

function dataParser(stateSetter) {
  return (data, acc) => {
    for (const entry of data.split('\n'))
      if (entry) {
        const text = entry.slice(entry.indexOf(':') + 2)
        let response
        try {
          response = JSON.parse(text)
        } catch (error) { /* pass */ }
  
        if (response && typeof response.choices[0].delta.content === 'string') {
          if (typeof acc === 'string')
            acc += response.choices[0].delta.content
          else
            acc = response.choices[0].delta.content
          
          stateSetter(acc)
        }
      }

    return acc
  }
}

function errorParser(data, acc) {
  const parsed = JSON.parse(data)
  if (!acc)
    acc = {}
  
  acc.code = parsed.error.code
  if (typeof acc.message === 'string')
    acc.message += parsed.error.message
  else
    acc.message = parsed.error.message
  
  return acc
}

export default createCompletion