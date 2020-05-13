const { Article } = require('../../model/article')
const { Comment } = require('../../model/comment')
const pagination = require('mongoose-sex-page')

let page = {}
page.article = async(req, res) => {
    const id = req.query.id
    const article = await Article.findOne({ _id: id }).populate('author')
    const comments = await Comment.find({ aid: id }).populate('uid')
    res.render('home/article', {
        article,
        comments
    })
}
page.default = async(req, res) => {
    let page = req.query && req.query.page || 1
    let articles = await pagination(Article).find().page(page).size(2).display(5).populate('author').exec()
    res.render('home/default', {
        articles
    })
}
const comment = async(req, res) => {
    try {
        await Comment.create(req.body)
        res.redirect(`/home/article?id=${req.body.aid}`)
    } catch (e) {
        return res.status(400).render('admin/error', {
            msg: '评论操作失败'
        })
    }
}
module.exports = {
    page,
    comment
}