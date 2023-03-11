const API_URL = 'https://api.openai.com/v1/chat/completions'
const PARAMS = {
    model: 'gpt-3.5-turbo',
    temperature: 0.4,
    stream: true,
    // max_tokens: 4096,
    // frequency_penalty: 1.0,
}

function createCompletion(stateSetter, messages, temperature, key, endCallback) {
  const controller = new AbortController()

  console.log(messages);

  fetch(API_URL, {
    signal: controller.signal,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(key)
    },
    body: JSON.stringify({ ...PARAMS, messages, temperature })
  }).then(result => {
    fetchStream(result.body, stateSetter).then(content => endCallback({ content, role: 'assistant' }))
  })

  return controller
}

function fetchStream(stream, stateSetter) {
  let content = ''
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
      
      for (const entry of new TextDecoder('utf-8').decode(value).split('\n'))
        if (entry) {
          const text = entry.slice(entry.indexOf(':') + 2)
          let response
          try {
            response = JSON.parse(text)
          } catch (error) { /* pass */ }

          if (response && response.choices[0].delta.content)
            content += response.choices[0].delta.content
            stateSetter(content)
        }

      return reader.read().then(processText)
    }
  )
}


export default createCompletion