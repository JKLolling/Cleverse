const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const csurf = require('csurf')
const helmet = require('helmet')
const { ValidationError } = require('sequelize')
const cookieParser = require('cookie-parser')
const { environment } = require('./config')
const routes = require('./routes')

const isProduction = environment === 'production'

const app = express()

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())

if (!isProduction) {
  app.use(cors())
}

app.use(helmet({
  // React will handle this for us, I guess. Not sure
  contentSecurityPolicy: false
}))


// Literally any request is checked by csrf. It is app wide middleware
// Why? Why have such an intense policy?
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && 'Lax',
      httpOnly: true
    }
  })
)

app.use(routes)

app.use((req, res, next) => {
  const err = new Error('The requested page could not be found')
  err.title = 'Resource Not Found'
  err.errors = ['The requested page could not be found']
  err.status = 404
  next(err)
})

// Sequelize error handler
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    err.errors = err.errors.map(e => e.message)
    err.title = 'Validation Error'
  }
  next(err)
})

// Error formatter
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  console.error(err.message)
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  })
})

module.exports = app
