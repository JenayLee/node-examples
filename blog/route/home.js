const express = require('express')
const home = express.Router()
const { page, comment } = require('../middleware/home')
home.get('/', page.default)
home.get('/article', page.article)
home.post('/comment', comment)
module.exports = home