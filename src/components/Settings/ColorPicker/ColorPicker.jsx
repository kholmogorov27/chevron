import { useState, useEffect, useRef } from 'react'
import { Button, Tooltip, Card, Box, Input , Alert, Link} from '@mui/joy'
import { HexColorPicker } from 'react-colorful'
import { ButtonCheck, ButtonX } from '../Buttons/Buttons'
import { BsDiagram2Fill, BsQuestionCircle, BsStars } from 'react-icons/bs'
import Color from 'colorjs.io'
import classes from './ColorPicker.module.css'
import getContrast from '../../../functions/generationUtils/getContrast'

function ColorPicker({ value, contrast, dependants, onChange, fullWidth }) {
  const [isOpened, setIsOpened] = useState(false)
  const [localValue, setLocalValue] = useState(value)
  const inputRef = useRef(null)

  // sync local value
  useEffect(() => setLocalValue(value), [value])

  const buttonColors = {
    _color: new Color(value),
    get normal() { return this._color },
    get hover() { return this._color.set({ 'lch.l': l => l > 30 ? l-5 : l+10 }) },
    get active() { return this._color.set({ 'lch.l': l => l > 30 ? l-10 : l+15 }) } 
  }

  let contrastAlert = null
  if (contrast) {
    let Lc = null
    try {
      Lc = Math.round(getContrast(localValue, contrast.color))
    } catch (error) {/* pass */}
    
    if (Lc !== null) {
      const options = getLcAlertOptions(Lc)
      const helpTooltip = 
        <Tooltip placement='top' sx={{textAlign: 'center'}} title={<>
          {
            contrast.isBackground
              ? <><b>this</b> color often contrasts on the <b>{contrast.name}</b> color</>
              : <><b>{contrast.name}</b> color often contrasts on <b>this</b> color</>
          }, <br/>
          current contrast value is {' '}
          <b>{Lc}</b> L<sup style={{position: 'relative', top: '0.15em', margin: '0 0 -0.15em -0.25em'}}>c</sup> {' '}
          (which is a {options.score} contrast) <hr /> 
          the <Link sx={{color: 'inherit', textDecorationColor: 'inherit', fontStyle: 'italic'}} underline='always' target='_blank' href='https://github.com/Myndex/SAPC-APCA/blob/master/documentation/APCA_in_a_Nutshell.md'>APCA</Link> algorithm is used to calculate the contrast value
        </>}>
          <div style={{display: 'flex'}}>
            <BsQuestionCircle size='1.3em'/>
          </div>
        </Tooltip>
      const contrastExample = 
        <Tooltip placement='top' title={<>
          <b>{contrast.name}</b> color contrast: <b>{Lc}</b> L<sup style={{position: 'relative', top: '0.15em', margin: '0 0 -0.15em -0.25em'}}>c</sup> {contrast.isBackground ? '(background)' : '(foreground)'}
        </>}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: contrast.isBackground ? contrast.color : localValue,
            p: '0.5em',
            mt: 0,
            borderRadius: 8
          }}>
            <BsStars color={contrast.isBackground ? localValue : contrast.color}/>
          </Box>
        </Tooltip>
      contrastAlert = 
        <Box sx={{
          mt: 1,
          display: 'flex',
          alignItems: 'stretch'
        }}>
          <Alert 
            color={options.color} 
            startDecorator={contrastExample}
            endDecorator={helpTooltip}
            size='sm'
            sx={{width: '100%'}}>
              {options.score.charAt(0).toUpperCase() + options.score.slice(1)} contrast
          </Alert>
        </Box>
    }
  }
  let dependantsAlert = null
  if (dependants) {
    const dependantsTooltip = 
      <Tooltip placement='top' title={<>
        dependants: <b>{dependants.join(', ')}</b>
      </>}>
        <div style={{display: 'flex'}}>
          <BsDiagram2Fill size='2em'/>
        </div>
      </Tooltip>
    const helpTooltip = 
      <Tooltip placement='top' sx={{textAlign: 'center'}} title={<>
        There are other colors that depends on this color, <br/> 
        changing this color will cause them to change: <br /> 
        <b>{dependants.join(', ')}</b>
      </>}>
        <div style={{display: 'flex'}}>
          <BsQuestionCircle size='1.3em'/>
        </div>
      </Tooltip>
    dependantsAlert = 
      <Alert 
        size='sm'
        sx={{mt: 1}}
        startDecorator={dependantsTooltip}
        endDecorator={helpTooltip}>
        Dependants
      </Alert>
  }

  return (
    <Tooltip
      variant='plain'
      open={isOpened}
      sx={{
        background: 'transparent',
        border: 'none',
        boxShadow: '0 0 20px 5px #0002',
        borderRadius: 10,
        padding: 0,
        zIndex: 10000
      }}
      disableFocusListener
      disableHoverListener
      disableTouchListener
      onClose={() => setIsOpened(false)}
      title=
      {
        <Card>
          <Box>
            <HexColorPicker 
              style={{ width: '100%' }} 
              color={localValue}
              onChange={setLocalValue}/>
            <Input
              ref={inputRef}
              value={localValue}
              onChange={e => setLocalValue(e.target.value)}
              className={classes['centered']}
              placeholder="Type color in HEX format"
              sx={{
                textAlign: 'center',
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0
              }}/>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 1 }}>
            <ButtonX
              sx={{ width: '100%', mr: 1 }}
              onClick={() => {
                setIsOpened(false)
                setLocalValue(value)
              }}/>
            <ButtonCheck 
              sx={{ width: '100%' }}
              onClick={() => {
                let newValue = false
                try {
                  newValue = Color.parse(localValue)
                } catch (error) {/* pass */}

                if (newValue) {
                  onChange(localValue)
                  setIsOpened(false)
                }
              }}/>
          </Box>
          { contrastAlert }
          { dependantsAlert }
        </Card>
      }>
        <Button 
          fullWidth={fullWidth}
          variant='solid'
          size='sm'
          sx={{
            p: 1,
            bgcolor: colorToString(buttonColors.normal),
            color: getFontColor(buttonColors.normal),
            '&:hover': { bgcolor: colorToString(buttonColors.hover) },
            '&:active': { bgcolor: colorToString(buttonColors.active) }
          }}
          onClick={() => setIsOpened(isOpened => !isOpened)}>
            {value}
        </Button>
    </Tooltip>
  )
}

function colorToString(color) {
  return color.toString({format: 'hex'})
}
function getFontColor(color) {
  return getContrast(color, '#eee', '#333')
}
function getLcAlertOptions(Lc) {
  const structure = [
    {from: 80, score: 'perfect', color: 'success'},
    {from: 60, score: 'good', color: 'success'},
    {from: 30, score: 'normal', color: 'neutral'},
    {from: 15, score: 'poor', color: 'warning'},
    {from: 0, score: 'bad', color: 'danger'}
  ]
  for (let i=0; i < structure.length; i++) {
    if (Lc >= structure[i].from) return structure[i]
  }
}

export default ColorPicker