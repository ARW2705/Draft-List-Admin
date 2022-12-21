import { useEffect, useState } from 'react'

import { screenBreakPoints } from '../constants/screen-breakpoints'


function useMediaQuery(screenSize) {
  const [match, setMatch] = useState(false)

  useEffect(() => {
    const { min, max } = screenBreakPoints[screenSize]
    const query = `(min-width: ${min}px) and (max-width: ${max}px)`
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
