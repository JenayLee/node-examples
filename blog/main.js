const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const template = require('art-template');
const dateFormat = require('dateformat')
const app = express();

require('./model/index')
const home = require('./route/home')
const admin = require('./route/admin')
const { loginGuard } = require('./middleware/admin')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'art')
app.engine('art', require('express-art-template'))

template.defaults.imports.dateFormat = dateFormat

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extends: false }))
app.use(session({ secret: ' secret key' }))
app.use('/admin', loginGuard)
app.use('/home', home)
app.use('/admin', admin)

app.listen(3000)