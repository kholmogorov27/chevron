import { isValidElement, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import useTransitions from '../../hooks/useTransitions'
import { motion } from 'framer-motion'
import { TbBan } from 'react-icons/tb'
import getCssGradient from '../../functions/generationUtils/getCssGradient'
import copyObj from '../../functions/dataUtils/copyObj'
import gC from '../../functions/generationUtils/getClasses'
import classes from './Card.module.css'

const PLATE_TRANSITION_DURATION = .75
const LOGO_TRANSITION_DURATION = .15
const LOGO_TRANSITION_DELAY = .25
// from min(height, width) of the viewport
const LOGO_SCALE_SIZE = .3

function Card({ active=false, visibility=true, icon, bgColor, textColor, hotKey, isHintActive=false, onClick }) {
  const [isAnimated, setIsAnimated] = useState(false)

  const backgroundStyle = useMemo(() => getCssGradient(bgColor), [bgColor])
  const [styles, setStyles] = useState({
    logo: {
      instant: {
        color: textColor
      },
      transition: {
        ease: 'easeOut',
        duratiovn: LOGO_TRANSITION_DURATION,
        delay: LOGO_TRANSITION_DELAY
      }
    },
    plate: {
      instant: {
        '--secondary': backgroundStyle
      },
      transition: {
        duration: PLATE_TRANSITION_DURATION
      }
    }
  })

  const logoRef = useRef(null)
  const plateRef = useRef(null)
      
  const detachableElements = 
    <>
      <motion.div
        ref={logoRef}
        className={gC(classes['logo'], active && classes['detached'])}
        style={styles?.logo?.instant}
        animate={styles?.logo?.animate}
        transition={styles?.logo?.transition}>
          { getIcon(icon, textColor) }
      </motion.div>
      <motion.div
        ref={plateRef} 
        className={gC(classes['plate'], active && classes['detached'])}
        style={styles?.plate?.instant}
        animate={styles?.plate?.animate}
        transition={styles?.plate?.transition}/>
    </>

  // state (for transitions)
  const state = active ? 'activated' : 'default'
  const animations = useMemo(() => {
    return ({
      transitions: {
        activated: {
          default() {
            setIsAnimated(true)
            const logoRect = logoRef.current.getBoundingClientRect()
            const plateRect = plateRef.current.getBoundingClientRect()
            const scales = {
              logo: 
                Math.min(window.innerWidth, window.innerHeight) 
                / Math.min(logoRect.width, logoRect.height) 
                * LOGO_SCALE_SIZE,
              plate: 
                /* 
                  D_[circle] = sqrt(a^2 + b^2)
    
                  pos_correction = max(offset from center)
                  (pos_correction to fully cover the viewport by the circle from any position)
                  
                  scale = D_[end] / D_[start] * pos_correction
                */
    
                // D_[end]
                Math.sqrt(window.innerWidth**2 + window.innerHeight**2)
                // D_[start]
                / Math.min(plateRect.width, plateRect.height)
                // pos_correction
                * Math.max(
                  ((window.innerWidth - plateRect.right) + plateRect.width/2) / window.innerWidth, 
                  (plateRect.left + plateRect.width/2) / window.innerWidth, 
                  (plateRect.top + plateRect.height/2) / window.innerHeight, 
                  ((window.innerHeight - plateRect.bottom) + plateRect.height/2) / window.innerHeight
                )
                // pos_correction scale constant
                * 2
                + .1
            }
            setStyles(s => {
              const styles = copyObj(s)
              return ({
                ...styles,
                logo: {
                  ...styles?.logo,
                  instant: {
                    ...styles?.logo?.instant,
                    left: logoRect.left,
                    top: logoRect.top,
                    height: logoRect.height,
                    width: logoRect.width,
                    position: 'absolute',
                    margin: 0
                  },
                  animate: {
                    ...styles?.logo?.animate,
                    left: '50%',
                    top: '50%',
                    translateX: '-50%',
                    translateY: '-50%',
                    scale: scales.logo
                  }
                },
                plate: {
                  ...styles?.plate,
                  instant: {
                    ...styles?.plate?.instant,
                    left: plateRect.left,
                    top: plateRect.top,
                    height: plateRect.height,
                    width: plateRect.width
                  },
                  animate: {
                    ...styles?.plate?.animate,
                    scale: scales.plate
                  }
                }
              })      
            })
            setTimeout(() => {
              window.cardRedirectAnimationEnd?.()
            }, 1000 * Math.max(PLATE_TRANSITION_DURATION, LOGO_TRANSITION_DELAY + LOGO_TRANSITION_DURATION))
          }
        }
      }
    })
  }, [])
  useTransitions(state, animations, visibility)

  return (
    <div
      className={gC('card', classes['card'], active && classes['active'])}
      onClick={onClick}>
      <div className={classes['logo-wrapper']}>
        { 
          isAnimated
          ? createPortal(
              detachableElements,
              document.getElementById('root')
            )
          : detachableElements
        }
      </div>
      <motion.div 
        className={gC(classes['hint'], isHintActive && classes['active'])}>
        {hotKey}
      </motion.div>
    </div>
  )
}

function getIcon(icon, color) {
  // if icon passed as a react element
  if (isValidElement(icon))
    return <div>{icon}</div>

  // if icon name passed
  else if (typeof icon === 'string' && Object.prototype.hasOwnProperty.call(window.ICONS, icon)) 
    return <div dangerouslySetInnerHTML={{__html: window.ICONS?.[icon]}}/>

  // fallback icon
  return <div><TbBan color={color}/></div>
}

export default Card