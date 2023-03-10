import { useContext, useEffect, useRef, useState } from 'react'
import { SettingsContext } from '../../contexts/Settings'
import dateFormat from 'dateformat'
import classes from './Time.module.css'

function Time() {
  /* settings */
  const settings = useContext(SettingsContext)

  const fontSize = settings.menu.time.fontSize
  const format = settings.menu.time.format

  const [time, setTime] = useState(new Date())

  const timerRef = useRef(null)

  useEffect(() => {
    // set initial time
    setTime(new Date())

    updateTime(setTime, timerRef)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => clearTimeout(timerRef.current)
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

function updateTime(callback, timerRef) {
  timerRef.current = setTimeout(() => {
    callback(new Date())
    updateTime(callback, timerRef)
  }, 1000 - getCurrentMs())
}

function getCurrentMs() {
  return Date.now() % 1000
}

export default Time