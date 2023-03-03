import gC from '../../functions/generationUtils/getClasses'
import classes from './LayoutButton.module.css'

function LayoutButton({ id, style, children, onClick }) {
  if (!id) throw new Error('`id` must be defined for a LayoutButton')

  const isSettingsVisited = localStorage.getItem(id + 'Visited')
  function handleClick() {
    localStorage.setItem(id + 'Visited', true)
    onClick()
  }

  return (
    <div
      key='icon'
      style={style}
      onClick={handleClick}
      className={gC(classes['container'], isSettingsVisited && classes['visited'])}>
      { children }
    </div>
  )
}

export default LayoutButton