const mongoose = require('mongoose')
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 4,
        maxlength: 20,
        required: [true, '请填写文章标题']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请填写文章作者']
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover: String,
    content: String
})
const Article = mongoose.model('Article', articleSchema)
module.exports = {
    Article
}