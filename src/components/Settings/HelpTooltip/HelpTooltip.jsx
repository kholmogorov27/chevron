import { Tooltip } from '@mui/joy'
import { BsQuestionCircle } from 'react-icons/bs'

function HelpTooltip({ title }) {
  return (
    <Tooltip sx={{ zIndex: 10000 }} placement='top' title={title}>
      <div style={{display: 'inline-flex'}}><BsQuestionCircle/></div>
    </Tooltip>
  )
}

export default HelpTooltip