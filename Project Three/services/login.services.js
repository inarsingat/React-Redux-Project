const _ = require('lodash')

const matchPassword = (request) => {
    const{username,password} = request.body
    return new Promise (async(resolve,reject) => {
        try{
            const[results,fields] = await global.sql.query('select username from users where username=? and password=?',[username,password])
            return resolve(results)
        }
        catch(err){
            return reject()
        }
    })
}

const createCookieDB = (request) => {
    return new Promise (async(resolve,reject) => {
        try{
            const alreadyExists = await usernameAndCookieExists(request)
            if(_.isEmpty(alreadyExists)){
                await global.sql.query('insert into cookies (username,cookie) VALUES (?,?)',[request.body.username,request.cookies['connect.sid']])
                return resolve()
            }
            return resolve()
        }
        catch(err){
            return reject()
        }
    })
}

const checkCookie = (request) => {
    return new Promise (async(resolve,reject) => {
        try{
            const[results,fields] = await global.sql.query('select username from cookies where cookie=?',[request.cookies['connect.sid']])
            resolve(results)
        }
        catch(err){
            return reject()
        }
    })
}

const usernameAndCookieExists = (request) => {
    return new Promise (async(resolve,reject) => {
        try{
            const[results,fields] = await global.sql.query('select * from cookies where username=? and cookie=?',[request.body.username,request.cookies['connect.sid']])
            return resolve(results)
        }
        catch(err){
            return reject()
        }
    })
}

module.exports = {
    createCookieDB,
    checkCookie,
    matchPassword
}