'use strict'

const User = require('../models/user')
const service = require('../services')

const signUp = (req, res) => {
    const user = new User({
      email: req.body.email,
      displayName: req.body.displayName,
      password: req.body.password
    })
  
    user.avatar = user.gravatar();
  
    user.save(err => {
      if (err) return res.status(500).send({ msg: `Error al crear usuario: ${err}` })
      return res.status(201).send({ token: service.createToken(user) })
    })
  }

function signIn (req, res) {
    User.find({ email: req.body.email}, (err, user) => {
        if (err) return res.status(500).send({ message: err})
        if (!user) return res.status(404).send({ message: `No existe el usuario`})

        req.user = user
        res.status(200).send({
            message: 'Te has logueado correctamente',
            token: service.createToken(user)
        })
    })
}

module.exports = {
    signUp,
    signIn
}