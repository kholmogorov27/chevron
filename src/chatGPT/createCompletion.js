const API_URL = 'https://api.openai.com/v1/chat/completions'
const PARAMS = {
    model: 'gpt-3.5-turbo',
    temperature: 0.4,
    stream: true,
    // max_tokens: 4096,
    // frequency_penalty: 1.0,
}

function createCompletion(stateSetter, query, temperature, key) {
  const controller = new AbortController()

  fetch(API_URL, {
    signal: controller.signal,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(key)
    },
    body: JSON.stringify({ ...PARAMS, messages: [{ role: 'user', content: query }], temperature })
  }).then(result => {
    const stream = result.body
    fetchStream(stream, stateSetter)
  })

  return controller
}

async function fetchStream(stream, stateSetter) {
  const reader = stream.getReader()
  let charsReceived = 0
  const li = document.createElement('li')

  // read() returns a promise that resolves
  // when a value has been received
  reader.read().then(
    function processText({ done, value }) {
      // Result objects contain two properties:
      // done  - true if the stream has already given you all its data.
      // value - some data. Always undefined when done is true.
      if (done)
        return li.innerText
      // value for fetch streams is a Uint8Array
      charsReceived += value.length
      const chunk = value
      li.appendChild(document.createTextNode(chunk))
      
      const list = li.innerText.split(',')
      const numList = list.map(item => parseInt(item))

      stateSetter('')
      
      for (const entry of new TextDecoder('utf-8').decode(new Uint8Array(numList)).split('\n'))
        if (entry) {
          const text = entry.slice(entry.indexOf(':') + 2)
          
          let response
          try {
            response = JSON.parse(text)
          } catch (error) { /* pass */ }

          if (response && typeof response.choices[0].delta.content === 'string')
            stateSetter(state => state + response.choices[0].delta.content)
        }

      return reader.read().then(processText)
    }
  )

  return reader
}

export default createCompletion