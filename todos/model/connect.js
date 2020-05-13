const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('数据库连接成功')
}).catch(res => {
    console.log('数据库连接失败')
})