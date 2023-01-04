import { useEffect, useState } from 'react'

import { buildMediaQuery } from './build-media-query'


function mapMatches(screenSizes) {
  let matches = {}
  screenSizes.forEach(screenSize => {
    const match = window.matchMedia(buildMediaQuery(screenSize)).matches
    matches = { ...matches, [screenSize]: match }
  })
  return matches
}

function containsDifferentMatch(currentMatches, newMatches) {
  if (Object.keys(currentMatches).length !== Object.keys(newMatches).length) return true

  for (const key in currentMatches) {
    if (currentMatches[key] !== newMatches[key]) return true
  }

  return false
}

function useMediaQueries(screenSizes) {
  const [matches, setMatches] = useState({})

  useEffect(() => {
    const newMatches = mapMatches(screenSizes)
    const hasDifferentMatch = containsDifferentMatch(matches, newMatches)
    if (hasDifferentMatch) setMatches(newMatches)

    const listener = () => setMatches(newMatches)
    window.addEventListener('resize', listener)

    return () => window.removeEventListener('resize', listener)
  }, [matches, screenSizes])

  return matches
}


export { useMediaQueries }
