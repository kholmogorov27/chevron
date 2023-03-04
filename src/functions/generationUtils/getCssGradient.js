import copyObj from '../dataUtils/copyObj'

function getCssGradient(options) {
  switch (options.type) {
    case 'solid':
      return options.color
    case 'gradient': {
      let _angle = options.angle ?? (options.gradientType === 'linear' ? 45 : '')
      if (typeof _angle === 'number') 
        _angle = _angle + 'deg'
      if (_angle)
        _angle += ','
    
      let _colors = copyObj(options.colors)
      
      if (options.stops)
        options.stops.forEach((value, index) => _colors[index] += ` ${value}%`)

      _colors = _colors.join(',')
      
      return `${options.gradientType}-gradient(${_angle}${_colors})`
    }
    default: throw new Error('unknown color type')
  }
}

export default getCssGradient