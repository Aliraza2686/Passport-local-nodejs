const express = require('express')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('./db/db')
require('dotenv').config()
require('./auth/passport')(passport)
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended : false }))
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}))
app.use(cookieParser('secret'))
app.use(cors({
    origin : '*',
    credentials : true
}))
app.use(passport.initialize())
app.use(passport.session())

const userRouter = require('./routes/userRoutes')

app.use(userRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})