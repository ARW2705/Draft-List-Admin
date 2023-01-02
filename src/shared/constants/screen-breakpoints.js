const extraSmallScreenBounds = {
  max: 599
}

const smallScreenBounds = {
  min: 600,
  max: 899
}

const midScreenBounds = {
  min: 900,
  max: 1199
}

const largeScreenBounds = {
  min: 1200,
  max: 1799
}

const extraLargeScreenBounds = {
  min: 1800
}

export const screenBreakPoints = {
  xs: extraSmallScreenBounds,
  sm: smallScreenBounds,
  md: midScreenBounds,
  lg: largeScreenBounds,
  xl: extraLargeScreenBounds
}
