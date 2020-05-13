const express = require('express')
const { Todos } = require('../model/todo')
const route = express.Router()
route.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'todos.html'))
})
route.get('/todos', async(req, res) => {
    const tasks = await Todos.find()
    res.send({
        success: true,
        data: tasks,
        msg: '操作成功'
    })
})
route.get('/add', async(req, res) => {
    try {
        await Todos.create({
            title: req.query.title
        })
        res.status(200).send({ success: true, msg: '操作成功' })
    } catch (e) {
        res.status(500).send({
            success: false,
            msg: e
        })
    }
})
route.post('/modify', async(req, res) => {
    const { id, state } = req.body
    const task = await Todos.findOne({
        _id: id
    })
    const data = Object.assign(task, { state })
    try {
        await Todos.updateOne({
            _id: id
        }, data)
        res.status(200).send({
            success: true,
            msg: '操作成功'
        })
    } catch (e) {
        res.status(500).send({
            success: false,
            msg: e
        })
    }
})
route.get('/delete', async(req, res) => {
    try {
        await Todos.findOneAndDelete({
            _id: req.query.id
        })
        res.status(200).send({
            success: true,
            msg: '操作成功'
        })
    } catch (e) {
        res.status(500).send({
            success: false,
            msg: e
        })
    }
})
module.exports = route