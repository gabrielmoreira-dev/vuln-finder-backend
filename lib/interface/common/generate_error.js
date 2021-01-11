module.exports = (res, error, status = 400) => {
  return res.status(status).send({
    error: error.message
  })
}