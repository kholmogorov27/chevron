import { useEffect, useState } from 'react'
import dateFormat from 'dateformat'
import classes from './Time.module.css'

function Time() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    // set initial time
    setTime(new Date())

    const timerGlobalRef = Symbol()
    updateTime(setTime, timerGlobalRef)

    return () => clearTimeout(window[timerGlobalRef])
  }, [])

  return (
    <div className={classes['time']}>
      {dateFormat(time, 'h:MM')}
    </div>
  )
}

function updateTime(callback, timerGlobalRef) {
  window[timerGlobalRef] = setTimeout(() => {
    callback(new Date())
    updateTime(callback, timerGlobalRef)
  }, 1000 - getCurrentMs())
}

function getCurrentMs() {
  return Date.now() % 1000
}

export default Time