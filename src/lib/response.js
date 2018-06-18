export const errorObject = (message, code) => {
  return {
    error: {
      code,
      message
    }
  }
}

export const throwError = (message, code = undefined, status = 400) => {
  const error = new Error(message)
  error.name = 'customError'
  error.code = code
  error.status = status
  throw error
}

export const responseError = (res, error, status = 400) => {
  const code = error.code
  const message = (error.name !== 'customError' ? 'something went wrong!' : error.message)

  console.error(error.stack)

  res.status(status).send(errorObject(message, code))
}
