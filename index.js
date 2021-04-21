'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect( config.db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err, res) => {
    if (err) {
        return console.log(`Error al conectar a la DB: ${err}`)
    }
    console.log('Conexion a la DB Ok!...')

    app.listen(config.port, ()=>{
        console.log(`API REST corriendo en: http://localhost:${config.port}`)
    })
})