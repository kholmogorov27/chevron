import * as types from './settingTypes'

const searchEngines = {}
for (const key in window.CONFIG.engines)
  searchEngines[key] = window.CONFIG.engines[key].name

const template = {
  general: {
    /* TODO
      mode: new types.List('chevron', ['chevron', 'legacy']),
    */
    // from confing.engines (keys)
    searchEngine: new types.List('google', searchEngines),
    searchHistory: new types.Switch(true),
    quickRedirect: new types.Switch(false),
    animationSpeed: new types.Range(
      400,
      { min: 0, max: 5000, step: 50 }, 
      { format: '{@}ms' }
    ),
    /**
     * languages: https://serpapi.com/google-languages
     * countries: https://serpapi.com/google-countries
     * locale parameter is used by autocomplete engine and other components 
     */
    locale: new types.Input('en', '[language]-[COUNTRY]'),
    tabTitle: new types.Input('Chevron'),
    // hidden
    redirectTarget: new types.Switch('_self', ['_self', '_blank'])
  },
  appearance: {
    colorScheme: new types.List('auto', ['auto', 'light', 'dark']),
    activeTheme: new types.List('default', 'appearance.themes'),
    themes: {
      default: new types.Theme()
    },
    // hidden; TODO: realistic
    style: new types.List('default', ['default'])
  },
  chevron: {
    thickness: new types.Range(
      15,
      { min: 1, max: 50 }, 
      { format: '{@}px' }
    ),
    size: new types.Range(
      20, 
      undefined, 
      {format: '{@}%' }
    ),
    quickLook: {
      fontSize: new types.Range(
        2.5,
        { min: 0.1, max: 10, step: 0.1 }, 
        { format: '{@}em' }
      ),
      marquee: new types.Switch(true),
      showMacrosLabel: new types.Switch(false),
      // hidden
      topCurvature: new types.Range(
        0.3,
        { min: 0, max: 1, step: 0.1 }
      ),
      // hidden
      bottomCurvature: new types.Range(
        0.4,
        { min: 0, max: 1, step: 0.1 }
      )
    }
  },
  query: {
    forceSearchEngineOnCtrl: new types.Switch(true),
    notifyAboutForcedSearchEngine: new types.Switch(true),
    field: {
      fontSize: new types.Range(
        5,
        { min: 0.1, max: 20, step: 0.1 }, 
        { format: '{@}em' }
      ),
      caret: new types.Switch(false)
    },
    suggestions: {
      fontSize: new types.Range(
        1.8,
        { min: 0.1, max: 10, step: 0.1 }, 
        { format: '{@}em' }
      ),
      autocompleteLimit: new types.Range(
        10,
        { min: 0, max: 50 }
      ),
      historyLimit: new types.Range(
        5,
        { min: 0, max: 50 }
      )
    },
    AI: {
      enabled: new types.Switch(true),
      apiKey: new types.Input('', 'Enter your openai api key'),
      temperature: new types.Range(
        0.4,
        { min: 0, max: 1, step: 0.05 }
      ),
      language: new types.Input('')      
    }
  },
  menu: {
    rows: new types.Range(
      2,
      { min: 1, max: 20 }
    ),
    columns: new types.Range(
      4,
      { min: 1, max: 20 }
    ),
    gap: new types.Range(
      10,
      { min: 0, max: 50 },
      { format: '{@}px' }
    ),
    pagination: new types.Switch(false),
    arrows: new types.Switch(true),
    drag: new types.Switch(true),
    time: {
      fontSize: new types.Range(
        1,
        { min: 0.1, max: 10, step: 0.1 }, 
        { format: '{@}em' }
      ),
      format: new types.Input('h:MM')
    }
  }
}

const hidden = [
  'general.redirectTarget',
  'appearance.style',
  'chevron.quickLook.topCurvature',
  'chevron.quickLook.bottomCurvature'
]

class Settings {
  constructor(template, hidden) {
    this._template = template
    this._hidden = hidden
  }

  get defaults() {
    return this._getDefaults(this.template)
  }

  get template() {
    return this._template
  }

  get hidden() {
    const result = [...this._hidden]
    
    // hide advanced theme colors
    const hiddenColors = ['chevron', 'query', 'suggestions', 'background', 'prefix', 'visited', 'time', 'card']
    for (const theme of Object.keys(this.template.appearance.themes)) {
      // light theme
      hiddenColors.forEach(hC => result.push('appearance.themes.' + theme + '.light.' + hC))
      // dark theme
      hiddenColors.forEach(hC => result.push('appearance.themes.' + theme + '.dark.' + hC))
    }

    return result
  }

  _getDefaults(structure) {
    const result = {}
    
    for (const key in structure) {
      if (typeof structure[key] !== 'object') throw new Error('wrong structure')
      
      if (structure[key] instanceof types.SettingType) {
        result[key] = structure[key].defaultValue
      } else {
        result[key] = this._getDefaults(structure[key])
      }
    }

    return result
  }

  //!
  getCategories(obj, prefix = '') {
    return Object.keys(obj).reduce((acc, k) => {
      const pre = prefix.length ? prefix + '.' : ''
      if ('render' in obj[k]) 
        Object.assign(acc, this.getCategories(obj[k], pre + k))
      else 
        acc[pre + k] = obj[k]
      return acc
    }, {})
  }
}

const settings = new Settings(template, hidden)

export default settings