const ERROR_HANDLER = {
  CastError: (res) => res.status(400).end(),
  JsonWebTokenError: (res, error) =>
    res.status(401).json({ error: 'token missing or invalid' }),
  defaultError: (res) => res.status(500).end()
}

module.exports = (error, request, response, next) => {
  console.error(error)
  console.log(error.name)

  const handler = ERROR_HANDLER[error.name] || ERROR_HANDLER.defaultError

  handler(response, error)
}
