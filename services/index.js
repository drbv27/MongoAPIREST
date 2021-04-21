'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken (user) {
    const payload = {
        sub: use._id,
        iat: moment().unix(),
        exp: moment().add(1, 'year').unix(),
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}

module.exports = createToken