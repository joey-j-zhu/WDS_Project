const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const Book = require('../models/book')
const uploadPath = path.join('public', Book.coverImageBasePath)
const Author = require('../models/author')

const imageMimeTypes = ['images/jpeg', 'images/png', 'images/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, )
    }
})

// All Books Route
router.get('/', async (req, res) => {
    res.send('All Books')
})

// New Book Route: "initiating" the action of creating the book
router.get('/new', async (req, res) => {
    renderNewPage(res, newBook())
})

// Create Book Route: "executing" the action of creating the book
router.post('/', upload.single('cover'), async (req, res) => {
    const fileName = req.file != null ? req.file.fileName : null // Files are not in the body, we have to handle differently
    const book = new Book({ // Instructions to create a new Book, initializing with information from the request
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate), // Send an object that the Book model can recognize
        pageCount: req.body.pageCount,
        coverImageName: fileName, // If Book receives a null value for this, 
        description: req.body.description
    })

    try {
        // res.redirect(`books/${newBook.id}`)
        res.redirect('books')
    } catch {
        renderNewPage(res, book, true)
    }
})

async function renderNewPage(res, book, hasError = false) {
    try {
        const authors = await Author.find({})
        const params = {
            authors: authors,
            book: book
        }
        if (hasError) params.errorMessage = 'Error Creating Book'
        const book = new Book()
        res.render('/books/new', params)
    } catch {
        res.redirect('/books')
    }
}

module.exports = router