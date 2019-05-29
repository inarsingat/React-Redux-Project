const _ = require('lodash')
const idValidation = require('../services/vacations.service')

const validateColumns = (req,res,next) => {
    if(_.isEqual(_.keysIn(JSON.parse(req.body.vacation)),['description','destination','from_date','to_date','price'])){
        return next()
    }
    return res.status(400).json('Missing Fields')
}

const validateFieldsContent = (req,res,next) => {
    if(_.every(_.map(_.omit(JSON.parse(req.body.vacation),'price'), field => ! _.isEmpty(field))) && JSON.parse(req.body.vacation).price !== 0){
        return next ()
    }
    return res.status(406).json('Missing Fields')
}

const validateDate = (req,res,next) => {
    const{from_date,to_date} = JSON.parse(req.body.vacation)
    if(from_date < to_date){
        return next()
    }
    return res.status(400).json('Wrong date input')
}

const validateInputType = (req,res,next) => {
    if(_.every(_.omit(JSON.parse(req.body.vacation),'price'), x => _.isString(x)) && _.isNumber(JSON.parse(req.body.vacation).price)){
        return next ()
    }
    return res.status(406).json('Wrong input type')
}

const validateIdExistence = async (req,res,next) => {
    const{id} = req.query
    try{
        const data = await idValidation.searchId()
        const idArr = data.map(vac => {return vac.id})
        if(idArr.includes(parseInt(id))){
            return next()
        }
        return res.status(400).json('No such Vacation')
    }
    catch(err){
        return res.sendStatus(400)
    }
}

module.exports = {
    validateColumns,
    validateInputType,
    validateDate,
    validateFieldsContent,
    validateIdExistence
}