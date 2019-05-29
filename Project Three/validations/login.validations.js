const _ = require('lodash')
const validateUsername = require ('../services/signup.services')
const userExistance = require ('../services/login.services')

const validateUser = async (req,res,next) => {
    try{
        const user = await validateUsername.seacrhUsername(req)
        if(!_.isEmpty(user)){
            return next()
        }
        return res.status(400).json('Back To Login')
    }
    catch(err){
        return res.sendStatus(400)
    }
}

validatePassword = async (req,res,next) => {
    try{
        const user = await userExistance.matchPassword(req)
        if(!_.isEmpty(user)){
            return next()
        }
        return res.status(400).json('Wrong Username or Password')
    }
    catch(err){
        return res.sendStatus(400)
    }
}

const validateCookie = async (req,res,next) => {
    try{
        const cookie = await userExistance.checkCookie(req)
        if(!_.isEmpty(cookie)){
            return next()
        }
        return res.status(400).json('Back To Login')
    }
    catch(err){
        return res.sendStatus(400)
    }
}

module.exports = {
    validateUser,
    validateCookie,
    validatePassword
}