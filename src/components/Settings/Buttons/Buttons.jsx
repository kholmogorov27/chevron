import { Button } from '@mui/joy'
import { FiCheck, FiX } from 'react-icons/fi'

export function ButtonCheck({ title, onClick, ...rest }) {
  return (
    <Button color='primary' onClick={onClick} {...rest}>
      { title || <FiCheck size='1.5em'/> }
    </Button>
  )
}
export function ButtonX({ title, onClick, ...rest }) {
  return (
    <Button color='danger' onClick={onClick} {...rest}>
      { title || <FiX size='1.5em'/> }
    </Button>
  )
}