'use strict'

const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Product = require('./models/product')

const app = express();
const port = process.env.PORT || 3001

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/api/product', (req,res) => {
    res.status(200).send({products: []})
})

app.get('/api/product/:productId', (req,res) => {
    let productId = req.params.productId

    Product.findById(productId, (err, product) =>{
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
        if (!product) return res.status(404).send({message: `El producto no existe`})

        res.status(200).send({product: product})
    })
})

app.post('/api/product', (req, res) => {
    console.log('POST /api/product')
    console.log(req.body)

    let product = new Product() //creo el nuevo producto
    product.name = req.body.name//añado las caracteristicas
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save((err, productStored) =>{ //salvo en la DB
        if (err) res.status(500).send({message: `Error al salvar en la DB: ${err}`})

        res.status(200).send({product: productStored})
    })
})

app.put('/api/product/:productId', (req,res) => {

})

app.delete('/api/product/productId', (req, res) => {

})

mongoose.connect('mongodb://localhost:27017/shopi',{ useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) {
        return console.log(`Error al conectar a la DB: ${err}`)
    }
    console.log('Conexion a la DB Ok!...')

    app.listen(port, ()=>{
        console.log(`API REST corriendo en: http://localhost:${port}`)
    })
})