import {
  Alert,
  Typography,
  Select, Option, selectClasses,
  Input as InputUI,
  Switch as SwitchUI
} from '@mui/joy'
import ColorPicker from '../src/components/Settings/ColorPicker/ColorPicker'
import { FiChevronDown } from 'react-icons/fi'
import { getPropertyByPath, setPropertyByPath } from '../src/functions/dataUtils/propertyByPath'
import copyObj from '../src/functions/dataUtils/copyObj'

export class SettingType {
  _dependants = null

  constructor(defaultValue, options={}) {
    this.defaultValue = defaultValue ?? undefined
    this.format = typeof options.format === 'string' ? options.format : null
    this.scale = typeof options.scale === 'number' ? options.scale : null
  }

  static getOtherSetting(location, destination, current) {
    let targetPath = ''
    if (destination.slice(0, destination.indexOf('.')) === '_parent_') {
      targetPath = location
      destination.split('.').forEach(token => {
        if (token === '_parent_') {
          targetPath = targetPath.slice(0, targetPath.lastIndexOf('.'))
        } else {
          targetPath += '.' + token
        }
      })
    } else {
      targetPath = destination
    }

    return getPropertyByPath(current, targetPath)
  }

  set dependants(value) {
    this._dependants = value
    Object.values(this._dependants).forEach(dependant => {
      if (dependant.defaultValue === undefined || dependant.defaultValue === null)
        dependant.defaultValue = this.defaultValue
    })
  }
  get dependants() {
    return this._dependants
  }

  render(current, path, onChange) {
    // defining onChange handler
    if (typeof onChange === 'function')
      this.selfOnChange = value => onChange(c => {
          const copy = copyObj(c)
          setPropertyByPath(copy, path, value)
          return copy
        })

    let value = getPropertyByPath(current, path)

    // formating and scaling
    const scaled = typeof value === 'number' && typeof this.scale === 'number' 
      ? this.scale * value
      : value
    const formatted = this.format 
      ? this.format.replaceAll('{@}', scaled)
      : scaled

    // rendering
    return this.display({
      raw: value,
      scaled,
      formatted
    },
    path,
    current)
  }

  onChange = value => {
    if (this._dependants)
      Object.values(this._dependants).forEach(dependant => dependant.onChange(value))
    
    this.selfOnChange?.(value)
  }

  // display fallback
  display(value) {
    return (
      <Alert color='danger' size='sm'>
      <Typography>
        Can&#39;t display this property correctly! The current value is {' '}
        <Typography variant='solid' color='info' size='sm'>{value.raw}</Typography>
      </Typography>
      </Alert>
    )
  }
}

export class List extends SettingType {
  constructor(defaultValue, list, ...rest) {
    super(defaultValue, ...rest)
    this.list = list
  }

  display(value, path, current) {
    let list
    switch (typeof this.list) {
      case 'object':
        list = this.list
        break
      case 'string':
        list = Object.keys(SettingType.getOtherSetting(path, this.list, current))
        break
      default: throw new Error('unknown `list` type')
    }

    let options
    if (Array.isArray(list))
      options = list.map(option => (
        <Option key={option} value={option}>
          {option}
        </Option>))
    else
      options = Object.entries(list).map(([value, description]) => (
        <Option key={value} value={value}>
          {description}
        </Option>))


    return (
      <Select 
        size='sm'
        value={value.formatted}
        indicator={<FiChevronDown/>}
        sx={{
          minWidth: 100,
          [`& .${selectClasses.indicator}`]: {
            transition: '0.2s',
            [`&.${selectClasses.expanded}`]: {
              transform: 'rotate(-180deg)',
            },
          },
        }}
        onChange={(e, value) => this.onChange(value)}>
          { options }
      </Select>
    )
  }
}
export class Switch extends SettingType {
  constructor(defaultValue, positions=[false, true], ...rest) {
    super(defaultValue, ...rest)
    this.positions = positions
  }

  display(value) {
    return (
      <SwitchUI
        size='md'
        checked={value.raw === this.positions[1]}
        startDecorator={
          typeof value.raw === 'string' 
            ? <Typography level='body2'>{value.raw}</Typography> 
            : null}
        onChange={e => this.onChange(
          e.target.checked 
            ? this.positions[1] 
            : this.positions[0])}/>
    )
  }
}
export class Range extends SettingType {
  constructor(defaultValue, options={}, ...rest) {
    super(defaultValue, ...rest)
    this.min = options.min ?? 0
    this.max = options.max ?? 100
    this.step = options.step ?? 1
  }
  
  display(value) {
    return (
      <InputUI
        size='sm'
        type='number'
        value={value.raw}
        slotProps={{
          input: {
            min: this.min,
            max: this.max,
            step: this.step 
          }
        }}
        endDecorator={this.format?.replaceAll('{@}', '')}
        onChange={e => this.onChange(Number(e.target.value))}/>
    )
  }
}
export class Input extends SettingType {
  constructor(defaultValue, placeholder, ...rest) {
    super(defaultValue, ...rest)
    this.placeholder = placeholder
  }

  display(value) {
    return (
      <InputUI 
        size='sm'
        placeholder={this.placeholder}
        value={value.raw}
        onChange={e => this.onChange(e.target.value)}/>
    )
  }
}
export class Color extends SettingType {
  constructor(defaultValue, contrast=null, ...rest) {
    super(defaultValue, ...rest)
    this.contrast = contrast
  }

  display(value, path, current) {
    let contrast = null
    if (this.contrast) {
      contrast = {
        name: this.contrast.name,
        isBackground: this.contrast.isBackground,
        color: SettingType.getOtherSetting(path, this.contrast.path, current)
      }
    }

    return (
      <ColorPicker
        value={value.raw}
        contrast={contrast}
        dependants={this.dependants && Object.keys(this.dependants)}
        onChange={this.onChange}/>
    )
  }
}
export class Palette {
  constructor(structure, colors) {
    // generating colors
    for (const {name, contrast } of structure) {
      const color = colors[name]
      this[name] = new Color(color, contrast)
    }

    for (const { name, dependants } of structure)
      if (dependants)
        this[name].dependants = dependants.reduce((acc, current) => ({...acc, [current]: this[current] }), {})
  }
}
export class Theme {
  static structure = [
    {
      name: 'primary',
      contrast: {
        name: 'secondary',
        isBackground: true,
        path: '_parent_.secondary'
      },
      dependants: [
        'chevron', 'query', 'suggestions', 'time'
      ]
    },
    {
      name: 'secondary',
      contrast: {
        name: 'primary',
        isBackground: false,
        path: '_parent_.primary'
      },
      dependants: [
        'background'
      ]
    },
    {
      name: 'accent',
      contrast: {
        name: 'secondary',
        isBackground: true,
        path: '_parent_.secondary'
      },
      dependants: [
        'prefix', 'visited'
      ]
    },
    {
      name: 'chevron',
      contrast: {
        name: 'background',
        isBackground: true,
        path: '_parent_.background'
      }
    },
    {
      name: 'query',
      contrast: {
        name: 'background',
        isBackground: true,
        path: '_parent_.background'
      }
    },
    {
      name: 'suggestions',
      contrast: {
        name: 'background',
        isBackground: true,
        path: '_parent_.background'
      }
    },
    {
      name: 'time',
      contrast: {
        name: 'background',
        isBackground: true,
        path: '_parent_.background'
      }
    },
    {
      name: 'background',
      contrast: {
        name: 'primary',
        isBackground: false,
        path: '_parent_.primary'
      },
      dependants: [
        'card'
      ]
    },
    {
      name: 'card'
    },    
    {
      name: 'prefix',
      contrast: {
        name: 'background',
        isBackground: true,
        path: '_parent_.background'
      }
    },
    {
      name: 'visited',
      contrast: {
        name: 'background',
        isBackground: true,
        path: '_parent_.background'
      }
    }
  ]
  static defaultColors = {
    light: {
      primary: '#212121',
      secondary: '#dee1e6',
      accent: '#3b72ff'
    },
    dark: {
      primary: '#f2f2f2',
      secondary: '#212121',
      accent: '#ffa00b'
    }
  }

  constructor() {
    this.light = new Palette(Theme.structure, Theme.defaultColors.light)
    this.dark = new Palette(Theme.structure, Theme.defaultColors.dark)
  }
}