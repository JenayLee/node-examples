const mongoose = require('mongoose')

const commentShema = new mongoose.Schema({
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: String,
    time: {
        type: Date,
        default: Date.now
    }
})
const Comment = mongoose.model('Comment', commentShema)
module.exports = {
    Comment
}