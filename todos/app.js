const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const todoRoute = require('./route/index')
require('./model/connect')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({
    extends: false
}))
app.use('/todo', todoRoute)
    // app.set('views', path.join(__dirname, 'views'))
    // app.set('view engine', 'html')
    // app.engine('art', require('express-art-template'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'todos.html'))
})
app.listen(3000)