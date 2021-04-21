'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const port = process.env.PORT || 3001

mongoose.connect('mongodb://localhost:27017/shopi',{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err, res) => {
    if (err) {
        return console.log(`Error al conectar a la DB: ${err}`)
    }
    console.log('Conexion a la DB Ok!...')

    app.listen(port, ()=>{
        console.log(`API REST corriendo en: http://localhost:${port}`)
    })
})