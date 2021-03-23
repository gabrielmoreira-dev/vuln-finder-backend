const axios = require('axios')
const AxiosLogger = require('axios-logger')

const instance = axios.create({
  baseURL: 'https://vuldb.com/?api',
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-VulDB-ApiKey": process.env.VULDB_API_KEY
  }
})

instance.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger)
instance.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger)

module.exports = instance