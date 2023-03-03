import { useState } from 'react'
import { 
  Box, 
  List, ListItem, ListItemContent, ListDivider, 
  Button, 
  Typography, 
  Switch
} from '@mui/joy'
import Property from '../Property/Property'
import { FiChevronRight } from 'react-icons/fi'
import { BsSun, BsMoon } from 'react-icons/bs'
import { Theme } from '../../../../settings/settingTypes'
import { getPropertyByPath } from '../../../functions/dataUtils/propertyByPath'

function Category({ path, template, current, hidden, onChange, visibility=true }) {
  const pathArray = path.split('.')

  // is the category nested in other category
  const nested = pathArray.length > 1
  // name of the category
  const name = pathArray[pathArray.length-1]
  const [isOpened, setIsOpened] = useState(!nested)
  const isTheme = getPropertyByPath(template, path) instanceof Theme
  // only 1 level nesting is supported
  const [innerPath, setInnerPath] = useState(isTheme ? (document.body.getAttribute('data-color-scheme') || 'light') : '')
  const itemsPath = innerPath ? path + '.' + innerPath : path

  return <>
    <Box
      onClick={nested ? () => setIsOpened(isOpened => !isOpened) : null}
      sx={{
        display: visibility ? 'flex' : 'none',
        alignItems: 'center',
        cursor: nested ? 'pointer' : undefined,
        px: 2,
        py: 1
      }}>
        <Typography
          level={nested ? 'h5' : 'h4'} 
          sx={{textTransform: isTheme ? undefined : 'capitalize' }}>
            {name}
        </Typography>
        { isTheme && <ThemeControl selected={innerPath} onSetSelected={() => setInnerPath(si => si === 'light' ? 'dark' : 'light')}/> }
        { 
          nested && <Button variant='plain' color='neutral' sx={{ml: 'auto'}}>
              <FiChevronRight
                size='1.5em'
                style={isOpened ? { transform: 'rotate(90deg)' } : null}/> 
            </Button>
        }
    </Box>
    {
      isOpened && <List
          variant='solid'
          sx={theme => ({
            maxHeight: isOpened ? undefined : '0px',
            background: theme.vars.palette.background.level1, 
            borderRadius: nested ? undefined : '12px', 
            borderLeft: nested ? '1px solid black' : undefined,
            borderColor: nested ? 'divider' : undefined,
            overflow: 'hidden',
            mb: nested ? isOpened ? 1 : 0 : 2,
            py: nested ? 0 : undefined,
            ml: nested ? 2 : 0
          })}>
            <Items {...{template, current, path: itemsPath, isThemeColor: isTheme, hidden, onChange}}/>
        </List>
    }
  </>
}

function Items({ template, current, path, isThemeColor=false, hidden, onChange }) {
  const nested = path.indexOf('.') !== -1
  const items = getPropertyByPath(template, path)

  const jsx = []
  for (const item in items) {
    const finalPath = path + '.' + item
    const visible = !hidden.includes(finalPath)

    // add a divider if visible
    visible && jsx.push(<ListDivider key={item+'d'} inset={nested ? 'gutter' : undefined}/>)
  
    if ('render' in items[item]) {
      jsx.push(
        <ListItem key={item} sx={{ 
          display: visible ? undefined : 'none',
          mr: nested ? 1 : undefined
        }}>
          <ListItemContent>
            <Property
              template={template} 
              current={current}
              path={finalPath}
              isThemeColor={isThemeColor}
              onChange={onChange}/>
          </ListItemContent>
        </ListItem>)
    } else {
      jsx.push(
        <Category 
          key={item}
          template={template}
          current={current}
          path={finalPath}
          hidden={hidden}
          visibility={visible}
          onChange={onChange}/>)
    }
  }
  // remove the first divider
  jsx.shift()

  return jsx
}

function ThemeControl({ selected, onSetSelected }) {
  return (
    <Switch
      checked={selected === 'light'}
      onChange={onSetSelected}
      onClick={e => e.stopPropagation()}
      size='md'
      variant={selected === 'light' ? 'solid' : 'outlined'}
      color='warning'
      sx={{ml: 1}}
      slotProps={{
        track: {
          children: (
            <>
              <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 6px'}}>
                <BsSun size='1em'/> 
                <BsMoon size='1em' sx={{mr: 'auto'}}/>
              </div>
            </>
          )
        }
      }}
    />)
}

export default Category