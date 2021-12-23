const mongoose = require('mongoose')

const coverImageBasePath = 'uploads/book'

// Treating a single model js file as an object class
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    publishDate: {
        type: Date,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    createdAt: { // Used for time sorting
        type: Date,
        required: true,
        default: Date.now
    },
    coverImageName: { // Use links for bulk data
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, // References another object in our collection
        required: true,
        ref: 'Author'
    }

})

module.exports = mongoose.model('Book', bookSchema)
module.exports.coverImageBasePath = coverImageBasePath