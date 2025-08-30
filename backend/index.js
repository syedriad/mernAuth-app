import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()
import bodyParser from 'body-parser'
import cors from 'cors'
import route from './Routes/AuthRouter.js'
import routeProd from './Routes/Products.js'

import './Models/db.js'

const PORT = process.env.PORT || 8080

// middlewares

app.use(express.json())
app.use(cors())

// test

app.get('/ping',(req,res)=>{
    res.send("PONG")
})

// routes

app.use('/auth', route)
app.use('/products', routeProd)    // => just for understanding of JWT

app.listen(PORT, ()=>{
    console.log(`Server is running on Port = ${PORT}`)
})