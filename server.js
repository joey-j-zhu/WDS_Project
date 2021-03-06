if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

//require loads the code inside 'express' and returns that as an object
const express = require('express') 
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index') // Use this path relative to our cwd to get index and open application
const authorRouter = require('./routes/authors') // Use this path relative to our cwd to get index and open application
const bookRouter = require('./routes/books') // Use this path relative to our cwd to get index and open application


// Also need a way to get information from this index to run it

app.set('view engine', 'ejs') // Express has an attribute called view engine
app.set('views', __dirname + '/views') // Where to store the views?
app.set('layout', 'layouts/layout') // Every file will be put into this layout file, like a template for all our HTML
app.use(expressLayouts)
app.use(express.static('public')) // public files: images, CSS, JS
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { 
useNewUrlParser: true }) // Don't hardcode connection URL, make it dependent on environment
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

// Tell app to use routers, with directories located as input
app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

app.listen(process.env.PORT || 3000) // Server sets port, not us


