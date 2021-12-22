const express = require('express')
const router = express.Router()

// Lambda function takes in actual request and response

router.get('/', (req, res) => {
    res.render('index')
})

module.exports = router
// send information back to server