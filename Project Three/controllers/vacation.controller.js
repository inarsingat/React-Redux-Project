const express = require('express')
const router = express.Router()
const signupS = require('../services/signup.services')
const signupV = require('../validations/signup.validations')
const loginS = require('../services/login.services')
const loginV = require('../validations/login.validations')
const allVacationsS = require ('../services/vacations.service')
const allVacationsV = require ('../validations/vacations.validation')
const _ = require('lodash')

router.post('/signup',signupV.validateColumns,signupV.validateInputType,signupV.validateUsername,
           signupV.validateContent, async (req,res) => {
    try{
        await signupS.signupFunction(req)
        res.sendStatus(202)
    }

    catch(err){
        res.sendStatus(400)
    }
})

router.post('/validate-username', async(req,res) => {
    try{
        const username = await signupS.seacrhUsername(req)
        return (_.isEmpty(username))? res.sendStatus(200) : res.sendStatus(400)
    }
    
    catch(err){
        res.sendStatus(400)
    }
})

router.post('/login', loginV.validateUser, loginV.validatePassword, async(req,res) => {
    try{
        await loginS.createCookieDB(req)
        res.sendStatus(202)
    }

    catch(err){
        res.status(400).json(err)
    }
})

router.post('/logout', (req,res) => {
    
    req.session.destroy((err) => {
        if(err){
            return res.sendStatus(400)
        }  
    return res.sendStatus(201)
    })
})

router.get('/home',loginV.validateCookie, async (req,res) => {
    try{
        const[vacs,following,name] = await Promise.all([allVacationsS.getAllVacations(), allVacationsS.getFollowers(req),allVacationsS.getNameAndAdmin(req)])
        const followingIdArray = following.map(vac => {return vac.vacation_id})
        const adjustVacationsArray = vacs.filter(vac => followingIdArray.indexOf(vac.id) !== -1)
        const vacations = _.union(adjustVacationsArray,vacs)
        
        res.json({vacations,following,name})
    }

    catch(err){
        res.status(404).json(err)
    }
})

router.get('/connection', async(req,res) => {
    try{
        const cookie = await allVacationsS.checkConnection(req)
        if(!_.isEmpty(cookie)){
            return res.sendStatus(200)
        }
        return res.sendStatus(400)
    }
    catch(err){
        res.sendStatus(400)
    }
})

router.put('/add-vacation',allVacationsV.validateColumns, allVacationsV.validateDate, allVacationsV.validateInputType,
           allVacationsV.validateFieldsContent, async (req,res) => {
    try{
        await allVacationsS.insertNewVacation(req)
        res.status(201).json('Succefully added')
    }

    catch(err){
        res.sendStatus(400)
    }
})

router.patch('/edit',allVacationsV.validateIdExistence, allVacationsV.validateDate, 
            allVacationsV.validateFieldsContent, async (req,res) => {
    try{
        await allVacationsS.updateVacation(req)
        res.status(201).json('Succefully edited')
    }

    catch(err){
        res.sendStatus(400)
    }
})

router.patch('/delete',allVacationsV.validateIdExistence, async (req,res) => {
    try{
        await allVacationsS.deleteVacation(req)
        res.status(201).json('Succefully deleted')
    }

    catch(err){
        res.sendStatus(400)
    }
})

router.patch('/:status', async(req,res) => {
    try{
        await allVacationsS.manageFollowing(req)
        res.status(200).json('Follower Updated')
    }

    catch(err){
        res.sendStatus(400)
    }
})

router.get('/stats', async (req,res) => {
    try{
        const stats = await allVacationsS.getStats()
        res.json(stats)
    }
    catch(err){
        res.sendStatus(400)
    }
})


module.exports = router;