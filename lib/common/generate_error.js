module.exports = (res, status, msg) => {
  return res.status(status).send({
    error: msg
  })
}