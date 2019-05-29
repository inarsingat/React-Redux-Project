    const _ = require('lodash')
    const fs = require('fs')

    const loginService = require('../services/login.services')

    const rawQuery = () => {
        return `insert into vacations (creation_date,description,destination,img_url,from_date,to_date,price,update_date) 
                VALUES (substring(SYSDATE(),1,10),?,?,?,?,?,?,substring(SYSDATE(),1,10))`
    }

    const getAllVacations = () => {
        return new Promise (async (resolve,reject) => {
            try{
                const[results,fields] = await global.sql.query('select id,description,destination,img_url,from_date,to_date,price,update_date from vacations where date_deleted is null order by id desc')
                return resolve(results)
            }
            catch(err){
                return reject(err)
            }
        })
    }

    const insertNewVacation = (request) => {
        return new Promise (async (resolve,reject) => {
            try{
                if (!request.files){
                    return
                }
                const sampleFile = request.files.image;
                fs.writeFile('./Project three React/myapp/build/upload/' + sampleFile.name, sampleFile.data ,err => {
                    if(err){
                       return
                    }
                })
                const {description,destination,from_date,to_date,price} = JSON.parse(request.body.vacation);
                await global.sql.query(rawQuery(),[description,destination,sampleFile.name,from_date,to_date,price])
                return resolve()
            }
            catch(err){
                return reject(err)
            }
        })
    }

    const updateQuery = (request) => {
        if(!request.files){
            return 'update vacations set update_date=substring(SYSDATE(),1,10),description=?,destination=?,from_date=?,to_date=?,price=? where id=?'
        }
        return 'update vacations set update_date=substring(SYSDATE(),1,10),description=?,destination=?,img_url=?,from_date=?,to_date=?,price=? where id=?'
    }    

    const updateVacation = (request) => {
        const{id} = request.query
        const{description,destination,from_date,to_date,price} = JSON.parse(request.body.vacation)
        return new Promise (async(resolve,reject) => {
            try{
                let query = []
                if(request.files){
                    query = [description,destination,sampleFile.name,from_date,to_date,JSON.parse(price),id]
                    const sampleFile = request.files.image;
                    fs.writeFile('./Project three React/myapp/build/upload/' + sampleFile.name, sampleFile.data ,err => {
                    if(err){
                       return
                    }
                })
                }
                query = [description,destination,from_date,to_date,JSON.parse(price),id]
                await global.sql.query(updateQuery(request),query)
                return resolve()
            }
            catch(err){
                return reject(err)
            }
        })
    }

    const deleteVacation = (request) => {
        const{id} = request.query
        return new Promise (async(resolve,reject) => {
            try{
                await global.sql.query('update vacations set date_deleted=substring(SYSDATE(),1,10) where id=?',id)
                return resolve()
            }
            catch(err){
                return reject(err)
            }
        })
    }

    const searchId = () => {
        return new Promise (async(resolve,reject) => {
            try{
                const[results,fields] = await global.sql.query('select id from vacations')
                return resolve(results)
            }
            catch(err){
                return reject(err)
            }
        })
    }

    const manageFollowing = (request) => {
        const{vac} = request.query
        const{status} = request.params
        return new Promise (async(resolve,reject) => {
            try{
                const username = await loginService.checkCookie(request)
                if(status === 'follow'){
                    await global.sql.query('insert into users_vacations (username,vacation_id) VALUES (?,?)',[username[0].username,vac])
                    return resolve()
                }
                if(status === 'unfollow'){
                    await global.sql.query('delete from users_vacations where username=? and vacation_id=?',[username[0].username,vac])
                    return resolve()
                }
            }
            catch(err){
                return reject()
            }
        })
    }

    const getFollowers = (request) => {
        return new Promise (async(resolve,reject) => {
            try{
                const username = await loginService.checkCookie(request)
                const[results,fields] = await global.sql.query('select vacation_id from users_vacations where username=?',[username[0].username])
                return resolve(results)
            }
            catch(err){
                return reject()
            }
        })
    }

    const getNameAndAdmin = (request) => {
        return new Promise (async(resolve,reject) => {
            try{
                const username = await loginService.checkCookie(request)
                const[results,fields] = await global.sql.query('select name,is_admin from users where username=?',[username[0].username])
                return resolve(results)
            }
            catch(err){
                return reject()
            }
        })
    }

    const getStats = () => {
        return new Promise (async(resolve,reject) => {
            try{
                const[results,fields] = await global.sql.query('select vacation_id, count(*) as total from users_vacations group by vacation_id')
                return resolve(results)
            }
            catch(err){
                return reject()
            }
        })
    }

    const checkConnection = (request) => {
        return new Promise(async(resolve,reject) => {
            try{
                const[results,fields] = await global.sql.query(`select cookie from cookies where cookie="${request.cookies['connect.sid']}"`)
                return resolve(results)
            }
            catch(err){
                return reject()
            }
        })
    }

    module.exports = {
        getAllVacations,
        insertNewVacation,
        getFollowers,
        updateVacation,
        deleteVacation,
        searchId,
        manageFollowing,
        getNameAndAdmin,
        getStats,
        checkConnection
    }