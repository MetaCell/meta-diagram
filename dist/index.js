
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./meta-diagram.cjs.production.min.js')
} else {
  module.exports = require('./meta-diagram.cjs.development.js')
}
