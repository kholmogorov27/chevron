import { useMemo, useContext, useRef, useEffect, useState } from 'react'
import { SettingsContext, ThemeContext } from '../../contexts/Settings'
import { useStateSelector } from '../../contexts/Store'
import useTransitions from '../../hooks/useTransitions'
import Time from '../Time/Time'
import MacrosMenu from '../MacrosMenu/MacrosMenu'
import { motion, useAnimationControls } from 'framer-motion'
import { easeInOutQuad, easeInQuad, easeOutCubic, easeOutQuad } from '../../functions/animUtils/easings'
import dC from '../../functions/generationUtils/dCommandToString'
import classes from './Chevron.module.css'

/* 
animations:
- appear
  1) appear
- smashToSide
  1) moving to the left side
  2) flattering
- menu (open/close)
  1) flattering
  2) stretching
  3) menu elements appear
*/
const timings = {
  appear: [1],
  smashToSide: [.6, .4],
  menu: [.4, .5, .5]
}
// coefficient of shape smoothing
const smoothing = .1
// multiplier of stretching the svg element in "opened" mode
const stretchMultiplier = 8

function Chevron({ visibility, onAnimationEnd }) {
  // settings
  const settings = useContext(SettingsContext)
  // theme
  const theme = useContext(ThemeContext)
  
  const duration = settings.general.animationSpeed / 1000
  const thickness = settings.chevron.thickness
  const color = theme.chevron
  const size = settings.chevron.size / 100

  // mode
  const mode = useStateSelector(store => store.mode)
  // for some animations
  const modeRef = useRef(mode)
  useEffect(() => {
    modeRef.current = mode
  }, [mode])

  const [isMacrosMenuRendered, setIsMacrosMenuRendered] = useState(false)

  const { stages, pivotOffset } = useMemo(() => {
    // stages of the shape for animating 
    const stages = [
      // normal shape
      // M50,50 c0,0,0,0,-50,50 M50,50 c0,0,0,0,-50,-50
      dC('M', [.5, .5/size], size) +
      dC('c', [0, 0, 0, 0, -.5, .5], size) +
      dC('M', [.5, .5/size], size) +
      dC('c', [0, 0, 0, 0, -.5, -.5], size),
      
      // smoothed shape
      // M50,50 c0,10,-50,50,-50,50 M50,50 c0,-10,-50,-50,-50,-50
      dC('M', [.5, .5/size], size) +
      dC('c', [0, smoothing, -.5, .5, -.5, .5], size) +
      dC('M', [.5, .5/size], size) +
      dC('c', [0, -smoothing, -.5, -.5, -.5, -.5], size),
      
      // flat shape (for toQuickLook)
      // M0,50 c0,0,0,0,0,50 M0,50 c0,0,0,0,0,-50
      dC('M', [0, .5]) +
      dC('c', [0, smoothing*2, 0, .5, 0, .5]) +
      dC('M', [0, .5]) +
      dC('c', [0, -smoothing*2, 0, -.5, 0, -.5]),
  
      // flat shape (for "opened" mode)
      // M50,50 c0,0,0,0,-50,0 M50,50 c0,0,0,0,-50,0
      dC('M', [.5, .5/size], size) +
      dC('c', [0, 0, 0, 0, -.5, 0], size) +
      dC('M', [.5, .5/size], size) +
      dC('c', [0, 0, 0, 0, -.5, 0], size),
  
      // flat shape stretched (for "opened" mode)
      // M100,50 c0,0,0,0,-100,0 M100,50 c0,0,0,0,-100,0
      dC('M', [.5*stretchMultiplier/2, .5/size], size) +
      dC('c', [0, 0, 0, 0, -.5*stretchMultiplier, 0], size) +
      dC('M', [.5*stretchMultiplier/2, .5/size], size) +
      dC('c', [0, 0, 0, 0, -.5*stretchMultiplier, 0], size)
    ]

    // values in px for translate
    const pivotOffset = {
      x: -.25*size
    }

    return { stages, pivotOffset }
  }, [size])
  
  // element animation controls
  const svgControls = useAnimationControls(),
        pathControls = useAnimationControls(),
        topMenuControls = useAnimationControls(),
        bottomMenuControls = useAnimationControls()
  const controls = useMemo(() => {
    return ({
      svg: svgControls,
      path: pathControls, 
      topMenu: topMenuControls, 
      bottomMenu: bottomMenuControls
    })
  }, [svgControls, pathControls, topMenuControls, bottomMenuControls])

  const animations = useMemo(() => {
    return ({
      transitions: {
        default: {
          async searching() {
            // unflattening
            await controls.path.start({
              translateX: pivotOffset.x,
              d: stages[1],
              transition: {
                ease: 'easeIn',
                duration: duration * timings.smashToSide[1]
              }
            })
            // moving to the center and resetting "pivot"
            controls.svg.start({
              left: '50%',
              transition: {
                ease: easeOutQuad,
                duration: duration * timings.smashToSide[0]
              }
            })
            // straightening the figure
            return await controls.path.start({
              d: stages[0],
              transition: {
                ease: 'linear',
                duration: duration * (timings.smashToSide[0] - timings.smashToSide[1])
              }
            })
          },
          async opened() {
            setIsMacrosMenuRendered(false)
            // closing top menu element
            controls.topMenu.start({
              translateY: '100%',
              transition: {
                ease: easeInOutQuad,
                duration: duration * timings.menu[2]
              }
            })
            // closing bottom menu element
            await controls.bottomMenu.start({
              translateY: '-100%',
              transition: {
                ease: easeInOutQuad,
                duration: duration * timings.menu[2]
              }
            })
            //!
            if (mode !== modeRef.current) return 
            // shrinking and correcting "pivot"
            await controls.path.start({
              translateX: pivotOffset.x,
              d: stages[3],
              transition: {
                ease: easeInOutQuad,
                duration: duration * timings.menu[1]
              }
            })
            //!
            if (mode !== modeRef.current) return
            // transforming into the initial shape
            return await controls.path.start({
              d: stages[0],
              transition: {
                ease: easeInOutQuad,
                delay: .1,
                duration: duration * timings.menu[0]
              }
            })
          }
        },
        searching: {
          async default() {
            // moving to the left side
            controls.svg.start({
              left: 0,
              transition: {
                ease: easeInQuad,
                duration: duration * timings.smashToSide[0]
              }
            })
            // smoothing the figure (for better animation transition) and resetting "pivot"
            await controls.path.start({
              translateX: 0,
              d: stages[1],
              transition: {
                ease: 'linear',
                duration: duration * timings.smashToSide[0]
              }
            })
            // flattening
            await controls.path.start({
              translateY: 0,
              d: stages[2],
              transition: {
                ease: easeOutCubic,
                duration: duration * timings.smashToSide[1]
              }
            })
            return onAnimationEnd()
          }
        },
        opened: {
          async default() {
            // make sure the svg element in the correct position
            controls.svg.start({
              left: '50%',
              transition: {
                ease: easeInOutQuad,
                duration: duration * timings.menu[0]
              }
            })
            // flattening (for "opened" mode)
            await controls.path.start({
              d: stages[3],
              transition: {
                ease: easeInOutQuad,
                duration: duration * timings.menu[0]
              }
            })
            // stretching
            await controls.path.start({
              translateX: 0,
              d: stages[4],
              transition: {
                ease: easeInOutQuad,
                delay: .1,
                duration: duration * timings.menu[1]
              }
            })
            // opening top menu element
            controls.topMenu.start({
              translateY: 0,
              transition: {
                ease: easeInOutQuad,
                duration: duration * timings.menu[2]
              }
            })
            // opening bottom menu element
            await controls.bottomMenu.start({
              translateY: 0,
              transition: {
                ease: easeInOutQuad,
                duration: duration * timings.menu[2]
              }
            })
            return setIsMacrosMenuRendered(true)
          }
        }
      }
    })
  }, [controls, duration, stages, mode, pivotOffset, onAnimationEnd])

  useTransitions(mode, animations, visibility)

  return (
      <div 
        className={classes['container']} 
        style={{
          '--menu-offset': thickness/2 + 'px',
          visibility: visibility ? 'visible' : 'hidden'
        }}>
        <div className={classes['wrapper']}>
            <motion.div 
              initial={{ translateY: '100%'}}
              animate={controls.topMenu}>
              <Time/>
            </motion.div>
        </div>
        <motion.svg
          initial={{ left: '50%' }}
          animate={controls.svg}
          className={classes['svg']}
          viewBox='0 0 0.5 1'>
          <motion.path
            initial={{
              translateX: pivotOffset.x,
              d: stages[0]
            }}
            animate={controls.path}
            stroke={color} 
            strokeWidth={thickness}
            fill="#0000"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"/>
        </motion.svg>
        <div className={classes['wrapper']}>
          <motion.div 
            initial={{ translateY: '-100%'}}
            animate={controls.bottomMenu}>
              <MacrosMenu 
                visibility={visibility}
                fullVisibility={isMacrosMenuRendered}/>
          </motion.div>
        </div>
      </div>
  )
}

export default Chevron