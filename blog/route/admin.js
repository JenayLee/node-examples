const express = require('express')
const admin = express.Router()
const {
    page,
    login,
    logout,
    updateUserInfo,
    deleteUser
} = require('../middleware/admin')

admin.get('/login', page.login)
admin.get('/user', page.user);
admin.post('/login', login)
admin.get('/logout', logout)
admin.get('/user-edit', page.userEdit)
admin.post('/user-edit', updateUserInfo)
admin.get('/delete', deleteUser)
admin.get('/article', page.article)
admin.get('/article-edit', page.articleEdit)
admin.post('/article-add', page.articleAdd)
module.exports = admin