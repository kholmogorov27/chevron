import { Box, Typography } from '@mui/joy'
import { getPropertyByPath } from '../../../functions/dataUtils/propertyByPath'
import camelCaseToTitle from '../../../functions/dataUtils/camelCaseToTitle'

function Property({ template, current, path, isThemeColor=false, onChange }) {
  const title = camelCaseToTitle(path.slice(path.lastIndexOf('.') + 1), !isThemeColor)
  const type = getPropertyByPath(template, path)
  return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '2em'
      }}>
      <Typography
        level='body1'
        sx={{mr: 5}}>
        {title}
      </Typography>
      <Box sx={{ml: 'auto', display: 'flex'}}>
        { 
          type.render(
            current,
            path,
            onChange) 
        }
      </Box>
    </Box>
  )
}

export default Property