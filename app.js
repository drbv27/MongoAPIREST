'use strict'

const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const api = require('./routes')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/api', api)

module.exports = app