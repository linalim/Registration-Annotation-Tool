
export const COLOR_MAP = {
  "valid line": 'rgba(255, 0, 0, $opacity)',
  "region of interest": 'rgba(0, 0, 0, 0.1)',
  "repeating symbol": 'rgba(159, 39, 176, $opacity)',
  "don't care": 'rgba(0, 0, 0, $opacity)'
}

const DEFAULT_COLOR = 'rgba(255, 255, 255, $opacity)'

function fetchColor(fieldName) {
  return COLOR_MAP[fieldName] || DEFAULT_COLOR
}

export function colorOf(field_name, opacity = 0.8) {
  return fetchColor(field_name).replace('$opacity', opacity)
}

export function rgbaColorOf(field_name, opacity = 0.8) {
  return fetchColor(field_name).replace('$opacity', opacity)
}

function channelInter(v, p) {
  return 255 - (255 - v) * p | 0
}

export function rgbColorOf(field_name, opacity = 0.8) {
  let color = rgbaColorOf(field_name, opacity)
  const [r, g, b, per] = color.match(/[0-9.]+/g)

  const diff = Number(per)

  return `rgb(${ channelInter(Number(r),diff) },${channelInter(Number(g),diff) },${channelInter(Number(b),diff)})`

}
