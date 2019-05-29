const _ = require('lodash')
const usernameValidation = require('../services/signup.services')

const validateInputType = (req,res,next) => {
    if(_.every(req.body,_.isString)){
        return next ()
    }
    return res.status(400).json('Wrong input type')
}

const validateContent = (req,res,next) => {
    if(_.every(_.map(req.body, field => ! _.isEmpty(field.trim())))){
        return next()
    }
    return res.status(400).json('Missing Fields')
}

const validateColumns = (req,res,next) => {
    if(_.isEqual(_.keysIn(req.body),['name','last','username','password'])){
        return next()
    }
        return res.status(400).json('Missing Fields')
}

const validateUsername = async (req,res,next) => {
    try{
        const data = await usernameValidation.seacrhUsername(req)
        const usernameFilter = data.find(user => user.username === req.body.username)
        if(_.isEmpty(usernameFilter)){
            return next()
        }
        return res.status(400).json('Username Taken, Please Choose Another')
    }
    catch(err){
        res.sendStatus(400)
    }
}

module.exports = {
    validateColumns,
    validateInputType,
    validateUsername,
    validateContent
}