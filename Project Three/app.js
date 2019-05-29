const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const cors = require('cors')
const mysql = require ('mysql2/promise')
const vacations = require('./controllers/vacation.controller')
const path = require ('path')
const fileUpload = require('express-fileupload');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(fileUpload())

app.use(session({
    secret:'My_Secret',
    saveUninitialized: true,
    resave: false,
    cookie : {
        maxAge:1000*60*10,
        httpOnly: true,
        secure:false
    }
}))

app.use(express.static('./React/myapp/build'));
app.use('/vacations-project',vacations)

const init = async () => {
      try{
        const conn = await mysql.createConnection ({
            host:'localhost',
            user:'root',
            database:'project_three_db'
        })
        global.sql = conn
        listen()
      }
      catch(err){
        console.log(err)
      }
}

const listen = () => {
    app.listen(4005, () => {
        console.log('server-up on port 4005!')
    })
}


app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, './React/myapp/build', 'index.html'))
})


init()