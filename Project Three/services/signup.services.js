const _ = require('lodash')

const rawQuery = () => {
    return 'insert into users (name,last,username,password) VALUES (?,?,?,?)'
}

const signupFunction = (req) => {
    return new Promise (async (resolve,reject) => {
        const user = Object.values(req.body)
        try{
            await global.sql.query(rawQuery(),user)
            return resolve()
        }

        catch(err){
            return reject(err)
        }
    })
}

const seacrhUsername = (req) => {
    return new Promise (async (resolve,reject) => {
        try{
            const [results,fields] = await global.sql.query('select username from users where username=?',[req.body.username]);
            return resolve(results)
        }

        catch(err){
            console.log(1,err)
            return reject(err)
        }
    })
}

module.exports = {
    signupFunction,
    seacrhUsername
}