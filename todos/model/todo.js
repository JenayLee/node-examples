const mongoose = require('mongoose')
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 2,
        required: true
    },
    state: {
        type: Boolean,
        default: false
    }
})
const Todos = mongoose.model('todo', todoSchema)
module.exports = {
    Todos
}