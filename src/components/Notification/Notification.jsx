import { RiErrorWarningLine } from 'react-icons/ri'
import classes from './Notification.module.css'

function Notification({ title, description, type }) {
  let icon = null

  switch (type) {
    case 'warning': icon = <RiErrorWarningLine size='1.5em'/>
  }
  
  return (
    <div className={classes['container'] + ' ' + type}>
      <div className={classes['title']}>
        { icon }{ title }
      </div>
      {
        description && <div className={classes['description']}>{ description }</div>
      }
    </div>
  )
}

export default Notification