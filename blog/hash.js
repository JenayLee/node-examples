const bcrypt = require('bcrypt')

async function run(params, salt = 0) {
    const result = await bcrypt.hash(params, await bcrypt.genSalt(salt))
    console.log(result, await bcrypt.compare(params, result))
}
run('123456')