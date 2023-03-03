import getMacro from '../functions/getMacro'
import normaliseURL from '../functions/webUtils/normaliseURL'
import randomHSLColor from '../functions/generationUtils/randomHSLColor'

//!
const URL_REDIRECT_TEXT_COLOR = '#f2f2f2'

export default class ParsedQuery {
  static specialTypes = ['calculator', 'currency']

  constructor(value, type, origin, engine, colorScheme, forceUseSearchEngine=false) {
    this.value = value
    this._type = type
    this.origin = origin
    this.engine = engine
    this.colorScheme = colorScheme

    if (!forceUseSearchEngine) {
      this.normalisedURL = normaliseURL(this.value)
      this.macro = getMacro(this.value, this.normalisedURL)
    }
  }

  get type() {
    let type = this._type

    /* search engine section */
    // ---

    /* macro section */
    if (this.macro) {
      type = 'macro'
      
      /* command section */
      if (this.macro.command)
        type = 'command'
      // ---

    } // ---

    /* direct URL section */
    if (this.normalisedURL)
      if (!this.macro)
        type = 'redirect'
    // ---

    return type
  }

  get url() {
    let url = null

    /* search engine section */
    // default template
    let template = this.engine.types['query'].template
    // if a template defined for this type
    if (this.engine.types[this._type])
      template = this.engine.types[this._type].template
    
    // URL based on search engine
    url = template
      // {@} - origin
      .replace('{@}', encodeURIComponent(this.origin))
      // {$} - value
      .replace('{$}', encodeURIComponent(this.value))
    // ---

    /* macro section */
    if (this.macro) {
      // URL based on macro URL
      url = this.macro.options.url

      /* command section */
      if (this.macro.command) {
        // URL based on macro command
        url = this.command.template
          // {@} - macro URL
          .replace('{@}', this.macro.options.url)
          // {$} - command args
          .replace('{$}', encodeURIComponent(this.macro.command.args))
      } // ---
    } // ---

    /* direct URL section */
    if (this.normalisedURL)
      url = this.value
    // ---

    return url
  }

  get label() {
    let label = null

    /* search engine section */
    // default label
    label = 'search'
    // special types
    if (ParsedQuery.specialTypes.includes(this.type))
      label = this.type
    // ---

    /* macro section */
    if (this.macro) {
      label = this.macro.options.name

      /* command section */
      if (this.macro.command) {
        label = this.macro.command.type

        // if the command has their own description
        if (this.command.description)
          label = this.command.description
      } // ---
    } // ---

    /* direct URL section */
    if (this.normalisedURL)
      if (!this.macro)
        label = 'redirect'
    // ---

    return label
  }

  get marquee() {
    let marquee = null

    /* search engine section */
    marquee = this.engine.name
    // ---

    /* macro section */
    if (this.macro)
      marquee = this.macro.options.name
    // ---

    /* direct URL section */
    if (this.normalisedURL)
      if (!this.macro)
        marquee = this.normalisedURL
    // ---

    return marquee
  }

  get bgColor() {
    let bgColor = null

    /* search engine section */
    bgColor = this.engine.bgColor
    // ---

    /* macro section */
    if (this.macro)
      bgColor = this.macro.options.bgColor
    // ---

    /* direct URL section */
    if (this.normalisedURL)
      if (!this.macro) {
        const isDarkColorScheme = this.colorScheme === 'dark'
        bgColor = {
          type: 'gradient',
          gradientType: 'linear',
          colors: [
            randomHSLColor(this.normalisedURL, isDarkColorScheme),
            randomHSLColor(this.normalisedURL + '1', isDarkColorScheme)
          ]
        }
      }
    // ---

    return bgColor
  }

  get textColor() {
    let textColor = null

    /* search engine section */
    textColor = this.engine.textColor
    // ---

    /* macro section */
    if (this.macro)
      textColor = this.macro.options.textColor
    // ---

    /* direct URL section */
    if (this.normalisedURL)
      if (!this.macro)
        //!
        textColor = URL_REDIRECT_TEXT_COLOR
    // ---

    return textColor
  }

  get command() {
    return this.macro.options.commands[this.macro.command.type]
  }

}