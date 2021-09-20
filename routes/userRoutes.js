const express = require('express')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const passport = require('passport')
const { auth } = require('../auth/auth')

const router = express.Router()

router.post('/register', async(req, res) => {
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 8)
    try {
        const user = new User({
            name,
            email,
            password : hashedPassword
        })
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(401).send(error.message)
    }
})

router.post('/login', async(req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if(err) throw err
      if(!user) {
          res.send("Invalid credentials")
      }else {
          req.logIn(user, err, () => {
              if(err) throw err
              res.send('Successfully loged in')
          })
      }
    })(req, res, next)
})

router.get('/get/user', auth, (req, res) => {
    res.send(req.user)
})

router.get('/logout', (req, res) => {
    req.logout()
    res.send("loged out")
})
module.exports = router
