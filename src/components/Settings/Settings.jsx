import { useContext, useRef, useState } from 'react'
import { SettingsContext, SetSettingsContext } from '../../contexts/Settings'
import { motion } from 'framer-motion'
import { CssVarsProvider, Card, Box, Button } from '@mui/joy'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import Header from './Header/Header'
import Category from './Category/Category'
import settings from '../../../settings/settings'

function Settings({ onClose }) {
  const current = useContext(SettingsContext)
  const setCurrent = useContext(SetSettingsContext)

  // to restore settings if user wants to decline changes
  const settingsSnapshotRef = useRef(current)

  const [showHidden, setShowHidden] = useState(false)
  const hiddenSettings = showHidden ? [] : settings.hidden

  return (
    <motion.div
      key='settings'
      transition={{duration: .25}}
      initial={{x: '100%'}}
      animate={{x: 0}}
      exit={{x: '100%'}}
      style={{
        position: 'absolute',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        top: 0,
        right: 0,
        zIndex: 99
      }}>
      <CssVarsProvider>
        <Card
          sx={theme => ({
            p: 0,
            m: '0 1em',
            height: 'calc(100vh - 1em * 2)',
            overflow: 'hidden',
            minWidth: '300px',
            borderRadius: '15px',
            boxShadow: '-5px 5px 10px #0003',
            background: theme.vars.palette.background.body
          })}>
          <Header 
            title='Settings' 
            onCancel={() => {
              // restore settings
              setCurrent(settingsSnapshotRef.current)
              onClose()
            }} 
            onApply={onClose}/>
          <Box sx={{
            overflowX: 'hidden',
            overflowY: 'auto',
            px: 2,
            '&::-webkit-scrollbar': {
              width: 0
            }
          }}>
            <Header title='Settings' isPlaceholder/>
            {
              Object.entries(settings.template).map(([category]) => {
                if (hiddenSettings.includes(category))
                  return null
                return <Category
                  key={category}
                  path={category}
                  hidden={hiddenSettings}
                  template={settings.template}
                  current={current}
                  onChange={setCurrent}/>
              })
            }
            <Box 
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              borderRadius: '12px 12px 0 0',
              overflow: 'hidden'
            }}>
              <Button
                sx={theme => ({ 
                  borderRadius: 0,
                  background: theme.vars.palette.background.level1,
                  '&:focus': {
                    outline: 'none',
                    backgroundColor: theme.vars.palette.primary.outlinedActiveBg
                  }
                })}
                fullWidth
                variant='soft'
                color='neutral'
                onClick={() => setShowHidden(sH => !sH)}>
                {
                  showHidden
                    ? <FiEye size='1.5em'/>
                    : <FiEyeOff size='1.5em'/>
                }  
              </Button>
              <Button
                sx={theme => ({ 
                  borderRadius: 0,
                  background: theme.vars.palette.background.level1,
                  '&:focus': {
                    outline: 'none',
                    backgroundColor: theme.vars.palette.primary.outlinedActiveBg
                  }
                })}
                fullWidth
                variant='soft'
                color='neutral'
                onClick={() => {
                  localStorage.removeItem('settings')
                  location.reload()
                }}>
                  Reset settings
              </Button>
              <Button
                sx={theme => ({ 
                  borderRadius: 0,
                  background: theme.vars.palette.background.level1,
                  '&:focus': {
                    outline: 'none',
                    backgroundColor: theme.vars.palette.primary.outlinedActiveBg
                  }
                })}
                fullWidth
                variant='soft'
                color='neutral'
                onClick={() => {
                  localStorage.removeItem('history')
                  location.reload()
                }}>
                  Clean history
              </Button>
            </Box>
          </Box>
        </Card>
      </CssVarsProvider>
    </motion.div>
  )
}

export default Settings