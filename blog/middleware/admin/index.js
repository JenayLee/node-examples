const { User } = require('../../model/user')
const { Article } = require('../../model/article')
const bcrypt = require('bcrypt')
const formidable = require('formidable')
const path = require('path')
const pagination = require('mongoose-sex-page')

let page = {};

const bcryptParam = async(param, salt = 10) => {
    return await bcrypt.hash(param, await bcrypt.genSalt(salt))
}
const login = async(req, res) => {
    const {
        email,
        password
    } = req.body
    if (!email.trim().length || !password.trim().length) {
        return res.status(400).render('admin/error', {
            msg: '邮箱或密码不正确'
        })
    }
    const user = await User.findOne({
        email
    });
    const isValid = user ? await bcrypt.compare(password, user.password) : true;
    if (!user) {
        return res
            .status(400)
            .render('admin/error', {
                msg: '用户不存在'
            })
    } else if (!isValid) {
        return res
            .status(400)
            .render('admin/error', {
                msg: '邮箱或密码不正确'
            })

    } else if (user.state == 1) {
        return res
            .status(400)
            .render('admin/error', {
                msg: '此账号已被禁用'
            })
    } else {
        req.session.username = user.username
        req.session.role = user.role
        req.app.locals.userInfo = user
        res.redirect('/admin/user')
    }
}
const loginGuard = (req, res, next) => {
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login')
    } else {
        req.app.locals.curentPage = req.url
        if (req.session.role == 'normal') {
            return res.redirect('/home/')
        }
        next()
    }
}
const logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid')
        res.redirect('/admin/login')
        app.locals.userInfo = null
    })
}
const updateUserInfo = async(req, res) => {
    const { query, body } = req;
    const user = await User.findOne({ email: body.email })
    if (user && (user._id != query.id)) {
        return res
            .status(400)
            .render('admin/error', {
                msg: '邮箱已存在'
            })
    }
    if (query.id) {
        if (!await bcrypt.compare(body.password, user.password)) {
            body.password = await bcryptParam(body.password)
        }
        await User.updateOne({
            _id: query.id
        }, body)
    } else {
        body.password = await bcryptParam(body.password)
        console.log(body.password)
        await User.create(body)
    }
    res.redirect('/admin/user')
}
const deleteUser = async(req, res) => {
    await User.findOneAndDelete({ _id: req.query.id })
    res.redirect('/admin/user')
}
page.login = (req, res) => {
    res.render('admin/login')
}
page.user = async(req, res) => {
    const page = req.query && req.query.page || 1;
    const pageSize = 2;
    const count = await User.countDocuments({});
    const total = Math.ceil(count / pageSize)
    const users = await User.find().limit(pageSize).skip((page - 1) * pageSize)
    res.render('admin/user', {
        users,
        count,
        total,
        page
    });
}
page.userEdit = async(req, res, next) => {
    const { query } = req;
    let user = null
    if (query.id) {
        user = await User.findOne({ _id: query.id })
    }
    res.render('admin/user-edit', {
        user,
        button: user ? '修改' : '新增'
    })
}
page.article = async(req, res) => {
    const page = req.query && req.query.page || 1
    const articles = await pagination(Article).find().page(page).size(1).display(5).populate('author').exec()
    res.render('admin/article', {
        articles,
    });
}
page.articleEdit = async(req, res, next) => {
    const {
        query
    } = req;
    let article = null
    if (query.id) {
        article = await Article.findOne({
            _id: query.id
        })
    }
    res.render('admin/article-edit', {
        article,
        button: article ? '修改' : '新增'
    })
}
page.articleAdd = (req, res) => {
    // 1. 创建表单解析对象
    const form = new formidable.IncomingForm()
        // 2. 配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads')
        // 3. 保留上传文件的后缀
    form.keepExtensions = true
        // 4. 解析表单
    form.parse(req, async(err, fields, files) => {
        // 1. err错误对象 解析成功 null 解析失败 错误信息
        // 2. fields 对象类型 保存普通表单数据
        // 3. files 对象类型 保存了和上传文件相关的数据
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            content: fields.content,
            cover: files.cover.path.split('public')[1]
        })
        res.redirect('/admin/article')
    })
}
module.exports = {
    login,
    loginGuard,
    logout,
    updateUserInfo,
    deleteUser,
    page
}