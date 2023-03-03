import { useState } from 'react'
import dateFormat from 'dateformat'
import classes from './Time.module.css'

function Time() {
  const [time, setTime] = useState(new Date())
  
  // sync time update
  setTimeout(() => {
    setTime(new Date())
    // main updater
    timeUpdater(setTime)
  }, 1000 - new Date().getMilliseconds())

  return (
    <div className={classes['time']}>
      {dateFormat(time, 'h:MM')}
    </div>
  )
}

function timeUpdater(callback, interval=1000) {
  return setInterval(callback(new Date), interval)
}

export default Time