import { useEffect, useState } from 'react'

import { buildMediaQuery } from './build-media-query'


function useMediaQuery(screenSize) {
  const [match, setMatch] = useState(false)

  useEffect(() => {
    const query = buildMediaQuery(screenSize)
    const media = window.matchMedia(query)
    if (media.matches !== match) setMatch(media.matches)

    const listener = () => setMatch(media.matches)
    window.addEventListener('resize', listener)

    return () => window.removeEventListener('resize', listener)
  }, [match, screenSize])

  return match
}


export { useMediaQuery }
