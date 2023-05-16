// import fetchFromScriptTag from "../functions/webUtils/fetchFromScriptTag"

// const API_ADDRESS = 'https://www.google.com/complete/search'

// async function autocomplete(query, locale) {
//   const params = {
//     q: query,
//     client: 'chrome-omni',
//     hl: locale,
//     // unique callback
//     callback: 'c' + new Date().getTime()
//   }
  
//   let url = API_ADDRESS + '?'
//   for (const key in params) {
//     if (Object.prototype.hasOwnProperty.call(params, key)) {
//       url += `${key}=${encodeURIComponent(params[key])}&`
//     }
//   }

//   const res = await fetchFromScriptTag(url, params.callback)
//   // array with autocomplete phrases
//   return res[1].map((suggestion, index) => {
//     const suggestionElement = {
//       suggestion,
//       type: res[4]['google:suggesttype'][index].toLowerCase(),
//       relevance: res[4]['google:suggestrelevance'][index]
//     }

//     if (suggestionElement.type === 'calculator')
//       // trim equals sign ('= 43' -> '43')
//       suggestionElement.suggestion = suggestionElement.suggestion.slice(2)

//     return suggestionElement
//   })
// }

// export default autocomplete
const API_ADDRESS = 'https://www.google.com/complete/search'

async function autocomplete(query, locale) {
  const params = {
    q: query,
    client: 'chrome-omni',
    hl: locale
  }

  const url = new URL(API_ADDRESS)
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

  const response = await fetch(url.toString())
  const data = await response.json()

  // Process the response data and return the autocomplete suggestions
  return data[1].map((suggestion, index) => {
    const suggestionElement = {
      suggestion,
      type: data[4]['google:suggesttype'][index].toLowerCase(),
      relevance: data[4]['google:suggestrelevance'][index]
    }

    if (suggestionElement.type === 'calculator') {
      // trim equals sign ('= 43' -> '43')
      suggestionElement.suggestion = suggestionElement.suggestion.slice(2)
    }

    return suggestionElement
  })
}

export default autocomplete
