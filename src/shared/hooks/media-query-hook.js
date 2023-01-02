import { useEffect, useState } from 'react'

import { screenBreakPoints } from '../constants/screen-breakpoints'


function useMediaQuery(screenSize) {
  const [match, setMatch] = useState(false)

  useEffect(() => {
    const { min, max } = screenBreakPoints[screenSize]
    const minQuery = `${min ? `(min-width: ${min}px)` : ''}`
    const maxQuery = `${max ? `(max-width: ${max}px)` : ''}`
    const query = `${minQuery} ${minQuery && maxQuery ? 'and' : ''} ${maxQuery}`
    const media = window.matchMedia(query)
    if (media.matches !== match) {
      setMatch(media.matches)
    }
    const listener = () => setMatch(media.matches)
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [match, screenSize])

  return match
}


export { useMediaQuery }
