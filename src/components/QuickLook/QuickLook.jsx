import { useContext, useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import useTransitions from '../../hooks/useTransitions'
import useParseQuery from '../../hooks/useParseQuery'
import { SettingsContext, ThemeContext } from '../../contexts/Settings'
import { useStateSelector } from '../../contexts/Store'
import { motion, useAnimationControls } from 'framer-motion'
import Notification from '../Notification/Notification'
import InteractiveBackground from '../InteractiveBackground/InteractiveBackground'
import { easeInBack, easeInOutQuart, easeOutElastic } from '../../functions/animUtils/easings'
import dC from '../../functions/generationUtils/dCommandToString'
import classes from './QuickLook.module.css'

/*
animations:
- open
  1) opening
- forward
  1) horizontal stretch
  2) vertical stretch
- close
  1) closing
*/
const timings = {
  open: [2.5],
  forward: [1, 1],
  close: [1]
}

function QuickLook ({ visibility, onAnimationEnd }) {
  // settings
  const settings = useContext(SettingsContext)
  // theme
  const theme = useContext(ThemeContext)
  
  const duration = settings.general.animationSpeed / 1000
  const thickness = settings.chevron.thickness
  const color = theme.chevron
  const topCurvature = settings.chevron.quickLook.topCurvature
  const bottomCurvature = settings.chevron.quickLook.bottomCurvature
  const showMacrosLabel = settings.chevron.quickLook.showMacrosLabel
  const notifyAboutForcedSearchEngine = settings.query.notifyAboutForcedSearchEngine
  
  /* store */
  const mode = useStateSelector(store => store.mode)
  const query = useStateSelector(store => store.query)
  const redirected = useStateSelector(store => store.redirected)
  const selectedSuggestion = useStateSelector(store => store.selectedSuggestion)
  // ---

  // persist query when query (queryOptions.value) becomes empty (on closing QuickLook)
  const [persistedQuery, setPersistedQuery] = useState(query)
  useEffect(() => {
    if (query) 
      setPersistedQuery(query)
  }, [query])

  // parse query
  const [parsedQuery, isSearchEngineForced] = useParseQuery(
    selectedSuggestion ? selectedSuggestion.suggestion : persistedQuery, 
    selectedSuggestion ? selectedSuggestion.type : undefined, 
    persistedQuery,
    redirected)

  let label = parsedQuery.label
  if (parsedQuery.type === 'macro' && !showMacrosLabel)
    label = ''

  // stages of the shape for animating
  const stages = useMemo(() => [
    // do not change the proportion of shape, it must always be {height} 1:0.5 {width}

    // initial (flat) shape
    // M0,50 c0,0,0,0,0,50 c0,0,0,0,0,-50 M0,50 c0,0,0,0,0,-50 c0,0,0,0,0,50
    dC('M', [0, .5]) +
    dC('c', [0, 0, 0, 0, 0, .5]) +
    dC('c', [0, 0, 0, 0, 0, -.5]) +
    dC('M', [0, .5]) +
    dC('c', [0, 0, 0, 0, 0, -.5]) +
    dC('c', [0, 0, 0, 0, 0, .5]),
    
    // normal shape
    // M0,50 c0,0,0,0,0,50 c0,-40,50,-30,50,-50 M0,50 c0,0,0,0,0,-50 c0,40,50,30,50,50
    dC('M', [0, .5]) +
    dC('c', [0, 0, 0, 0, 0, .5]) +
    dC('c', [0, -bottomCurvature, .5, -topCurvature, .5, -.5]) +
    dC('M', [0, .5]) +
    dC('c', [0, 0, 0, 0, 0, -.5]) +
    dC('c', [0, bottomCurvature, .5, topCurvature, .5, .5]),
    
    // horizontal stretch
    // M0,50 c0,0,0,0,0,50 c0,-40,50,-30,340,-50 M0,50c0,0,0,0,0,-50 c0,40,50,30,340,50
    (ratio) => {
      return (
        dC('M', [0, .5]) +
        dC('c', [0, 0, 0, 0, 0, .5]) +
        dC('c', [0, -bottomCurvature, .5, -topCurvature, ratio*2, -.5]) +
        dC('M', [0, .5]) +
        dC('c', [0, 0, 0, 0, 0, -.5]) +
        dC('c', [0, bottomCurvature, .5, topCurvature, ratio*2, .5])
      )
    },

    // vertical stretch
    // M0,50 c0,0,0,0,0,50 c680,0,340,0,340,-50 M0,50 c0,0,0,0,0,-50 c680,0,340,0,340,50
    (ratio) => {
      return (
        dC('M', [0, .5]) +
        dC('c', [0, 0, 0, 0, 0, .5]) +
        dC('c', [ratio*4, 0, ratio*2, 0, ratio*2, -.5]) +
        dC('M', [0, .5]) +
        dC('c', [0, 0, 0, 0, 0, -.5]) +
        dC('c', [ratio*4, 0, ratio*2, 0, ratio*2, .5])
      )
    }
  ], [bottomCurvature, topCurvature])

  // window width
  const width = useSyncExternalStore(
    // subscriber
    listener => {
      window.addEventListener('resize', listener)
      return () => window.removeEventListener('resize', listener)
    },
    // listener
    () => window.innerWidth
  )
  // window height
  const height = useSyncExternalStore(
    // subscriber
    listener => {
      window.addEventListener('resize', listener)
      return () => window.removeEventListener('resize', listener)
    },
    // listener
    () => window.innerHeight
  )

  // element animation controls
  const pathControls = useAnimationControls(),
        textControls = useAnimationControls()
  const controls = useMemo(() => {
    return ({
      path: pathControls, 
      text: textControls
    })
  }, [pathControls, textControls])

  const animations = useMemo(() => {
    return ({
      transitions: {
        default: {
          async searching() {
            // changing the shape to flat shape
            controls.path.start({
              d: stages[0],
              transition: {
                ease: easeInBack,
                duration: duration * timings.close[0]
              }
            })
            // animating text
            await controls.text.start({
              translateX: '-100%',
              transition: {
                ease: easeInBack,
                duration: duration * timings.close[0]
              }
            })
            controls.text.set({
              translateX: '0%'
            })
            return onAnimationEnd()
          }
        },
        searching: {
          async default() {
            // opening
            controls.path.start({
              d: stages[1],
              transition: {
                ease: easeOutElastic,
                duration: duration * timings.open[0]
              }
            })
            // animating text
            return await controls.text.start({
              translateX: '0%',
              transition: {
                ease: easeOutElastic,
                duration: duration * timings.open[0]
              }
            })
          }
        },
        redirected: {
          async any() {
            // horizontal stretch
            controls.path.start({
              d: stages[2](window.innerWidth/window.innerHeight),
              transition: {
                ease: easeInOutQuart,
                duration: duration * timings.forward[0]
              }
            })
            // label to the center
            await controls.text.start({
              left: window.innerWidth/2,
              x: '-50%',
              transition: {
                ease: easeInOutQuart,
                duration: duration * timings.forward[0]
              }
            })
            // vertical stretch
            await controls.path.start({
              d: stages[3](window.innerWidth/window.innerHeight),
              transition: {
                ease: easeInOutQuart,
                duration: duration * timings.forward[1]
              }
            })
            return window.mainRedirectAnimationEnd?.()
          }
        }
      }
    })
  }, [controls, duration, stages, onAnimationEnd])

  const state = redirected ? 'redirected' : mode
  useTransitions(state, animations, visibility)

  const variables = {
    '--thickness': thickness + 'px',
    '--fontSize': '5vmin',
    '--textColor': parsedQuery.textColor
  }

  return <>
    {
      isSearchEngineForced && notifyAboutForcedSearchEngine && <Notification 
        type='warning'
        title='Ctrl is pressed'
        description='Search engine will be used for all queries'/>
    }
    <div style={{
      ...variables,
      pointerEvents: 'none',
      visibility: visibility ? 'visible' : 'hidden',
      alignSelf: 'flex-start'
    }}>
      <div className={classes['clip-container']}>
        <motion.div 
          className={classes['label-container']} 
          animate={textControls}>
          <div className={classes['label']}>{label}</div>
        </motion.div>
        <InteractiveBackground
          width={width}
          height={height}
          color={parsedQuery.bgColor}
          textColor={parsedQuery.textColor}
          marqueeText={parsedQuery.marquee}/>
      </div>
      <svg
        className={classes['svg']}
        viewBox='0 0 1 1'>
        <motion.path
          animate={pathControls}
          initial={{d: stages[0]}}
          d={stages[0]}
          fill="#0000"
          stroke={color} 
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"/>
        <clipPath id="quick-look-clip-path" clipPathUnits="objectBoundingBox">
          <motion.path
            transform={`scale(${height/width}, 1)`}
            animate={pathControls}
            initial={{d: stages[0]}}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeLinejoin="round"/>
        </clipPath>
      </svg>
    </div>
  </>
}

export default QuickLook