import Color from 'colorjs.io'

function getContrast(bgColor, color1, color2) {
  const background = bgColor instanceof Color ? bgColor : new Color(bgColor)
  if (color2 === null || color2 === undefined) {
    return Math.abs(background.contrast(color1, 'APCA'))
  } else {
    if (Math.abs(background.contrast(color1, 'APCA')) > Math.abs(background.contrast(color2, 'APCA'))) {
      return color1
    } else {
      return color2
    }
  }
}

export default getContrast