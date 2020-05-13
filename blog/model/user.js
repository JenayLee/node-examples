const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    // 0 启用 1 禁用
    state: {
        type: Number,
        default: 0
    }
})
const User = mongoose.model('User', userSchema)

module.exports = {
    User
}