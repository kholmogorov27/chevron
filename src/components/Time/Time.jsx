import { useContext, useEffect, useState } from 'react'
import { SettingsContext } from '../../contexts/Settings'
import dateFormat from 'dateformat'
import classes from './Time.module.css'

function Time() {
  /* settings */
  const settings = useContext(SettingsContext)

  const fontSize = settings.menu.time.fontSize
  const format = settings.menu.time.format

  const [time, setTime] = useState(new Date())

  useEffect(() => {
    // set initial time
    setTime(new Date())

    const timerGlobalRef = Symbol()
    updateTime(setTime, timerGlobalRef)

    return () => clearTimeout(window[timerGlobalRef])
  }, [])

  const variables = {
    '--font-size': fontSize + 'em'
  }

  return (
    <div className={classes['time']} style={variables}>
      {dateFormat(time, format)}
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