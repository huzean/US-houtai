'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
//本地环境
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST:'http://176.166.1.47:11025'
})
