import { memo, useState, useEffect, useContext, useRef, useCallback } from 'react'
import useRedirect from '../../hooks/useRedirect'
import useIsKeyPressed from '../../hooks/useIsKeyPressed'
import { useStateSelector , useUpdate} from '../../contexts/Store'
import { SettingsContext } from '../../contexts/Settings'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { Grid } from '@splidejs/splide-extension-grid'
import Card from '../Card/Card'
import { allowedModes } from '../../rules'
import classes from './MacrosMenu.module.css'
import '@splidejs/react-splide/css'

const pinnedMacros = window.CONFIG.macros.filter(m => m.pinned)

function MacrosMenu({ visibility, fullVisibility }) {
  // settings
  const settings = useContext(SettingsContext)

  const pagination = settings.menu.pagination 
  const arrows = settings.menu.arrows 
  const drag = settings.menu.drag 
  const rows = settings.menu.rows
  const cols = settings.menu.columns
  const gap = settings.menu.gap

  const slideCapacity = cols * rows
  const isSliderHasMultipleSlides = pinnedMacros.length > slideCapacity

  /* store */
  const mode = useStateSelector(store => store.mode)
  // ---
  
  // selected macro
  const [selected, setSelected] = useState(null)
  const isShiftPressed = useIsKeyPressed('Shift')
  // if the slider is on the slide with the selected card
  const [isCardInFocus, setIsCardInFocus] = useState(false)
  const sliderRef = useRef(null)
  
  const updateValue = useUpdate()
  const redirect = useRedirect()

  const activateCard = useCallback(macro => {
    const cardIndex = pinnedMacros.indexOf(macro)
    
    // select the card
    setSelected(macro)
    // block the store
    updateValue({ redirected: true })
    // go to the selected card
    sliderRef.current.splide.Components.Controller.go(
      Math.floor(cardIndex / slideCapacity),
      // allow going to the current slide
      true,
      () => setIsCardInFocus(true)
    )
    
    // !visibility - ignore animations if the menu isn't visible
    redirect(macro.url, 'card', !visibility)
  }, [redirect, visibility, slideCapacity, updateValue])

  // hotkeys listener
  useEffect(() => {
    const handleKeypress = e => {
      if (!allowedModes.get('Chevron').has(mode)) return

      if (e.shiftKey) {
        for (const macro of pinnedMacros) {
          if (e.code === macro.key) {
            activateCard(macro)
            break
          }
        }
      }
    }

    document.addEventListener('keypress', handleKeypress)
    return () => document.removeEventListener('keypress', handleKeypress)
  }, [mode, activateCard])

  const splideOptions = {
    ref: sliderRef,
    tag: 'section',
    extensions: { Grid },
    options: {
      pagination,
      arrows: arrows && isSliderHasMultipleSlides,
      drag: drag && isSliderHasMultipleSlides,
      perPage: 1,
      wheel: true,
      keyboard: allowedModes.get('Slider').has(mode) ? 'global' : false,
      grid: {
        cols,
        rows,
        gap: {
          col: gap + 'px',
          row: gap + 'px'
        }
      }
    }
  }
  return (
    <div className={classes['container']}>
      <Splide {...splideOptions}>
        {
          pinnedMacros.map(pm => {
            return (
              <SplideSlide key={pm.name}>
                <Card
                  active={pm === selected && visibility && fullVisibility && isCardInFocus}
                  title={pm.name}
                  icon={pm.icon}
                  bgColor={pm.bgColor}
                  textColor={pm.textColor}
                  hotKey={pm.key && pm.key.slice(-1)}
                  isHintActive={isShiftPressed}
                  onClick={() => activateCard(pm)}/>
              </SplideSlide>
            )
          })      
        }
      </Splide>
    </div>
  )
}

export default memo(MacrosMenu)