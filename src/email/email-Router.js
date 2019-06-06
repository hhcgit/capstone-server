const express = require('express')
const emailService = require('./email-service')
const emailRouter = express.Router()
const validator = require('validator')

const jsonBodyParser = express.json()

emailRouter
.route('/')
.post(jsonBodyParser, (req, res, next) => {
    const email = req.body

    if (!validator.isEmail(email.email)){
        return res.status(400).json("Invalid Email Entry")
    }

    emailService.checkEmailExist(req.app.get('db'), email)
    .then(a => {
        if (!a){
            return res.status(400).json(`No User With ${email.email} Registered`)
        }
        return ''
    })
    .then( () => emailService.findUserID(req.app.get('db'), email))
    .then(id => {
        return {
            user_id:id.id,
        }
    })
    .then(uid => {
        return emailService.makeTempKey(req.app.get('db'), uid.user_id, email)
    })
    // .then(key => {
    //     if (emailService.emailKey(key, email)){
    //         return res.status(200).json("Please Check Email to Reset Password")
    //     }
    //     return res.status(400).json("Failed to Reset Email, Please Try Later")
    // })
})

module.exports = emailRouter