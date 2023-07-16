export const getApiUrl = (urlSegment) => {
  const isDevEnv =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"

  const url = isDevEnv
    ? `http://www.localhost:4000/${urlSegment}`
    : `https://cart.cyclic.app/${urlSegment}`

  return url
}
