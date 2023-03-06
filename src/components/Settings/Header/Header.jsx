import { Box, Typography } from '@mui/joy'
import { ButtonCheck, ButtonX } from '../Buttons/Buttons'

function Header({ title, isPlaceholder=false, onApply, onCancel }) {
  const sx = Object.assign({zIndex: 10},
    isPlaceholder
      ? {visibility: 'hidden'}
      : {maxHeight: 0})

  return (
    <Box sx={sx}>
      <Box sx={theme => ({
        p: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0px 5px 10px #0003',
        background: `rgba(${theme.vars.palette.neutral.mainChannel} / 0.4)`, 
        backdropFilter: 'blur(10px)'
      })}>
        <ButtonCheck onClick={onApply}/>
        <Typography
          level='h3'
          sx={{mx: 2}}
          textAlign='center'>
            {title}
        </Typography>
        <ButtonX onClick={onCancel}/>
      </Box>
    </Box>
  )
}

export default Header