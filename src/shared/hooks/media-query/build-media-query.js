import { screenBreakPoints } from '../../constants/screen-breakpoints'


function buildMediaQuery(screenSize) {
  const { min, max } = screenBreakPoints[screenSize]
  const minQuery = `${min ? `(min-width: ${min}px)` : ''}`
  const maxQuery = `${max ? `(max-width: ${max}px)` : ''}`
  return `${minQuery} ${minQuery && maxQuery ? 'and' : ''} ${maxQuery}`
}


export { buildMediaQuery }
