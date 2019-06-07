const express = require('express')
const usersRouter = express.Router()
const jsonBodyParser = express.json()
const UsersService = require('./users-service');

usersRouter
    .post('/', jsonBodyParser, (req,res,next) => {
        const { password, user_name, email } = req.body
        for (const field of ['user_name', 'password', 'email'])
        if (!req.body[field])
        return res.status(400).json({
            error: `Missing '${field}' in request body`
        })
        const passwordError = UsersService.validatePassword(password)

        if (passwordError)
            return res.status(400).json({ error: passwordError })
        UsersService.hasUserWithUserName(
            req.app.get('db'),
              user_name
        )
          .then(hasUserWithUserName => {
            if (hasUserWithUserName)
              return res.status(400).json({ error: `Username already taken` })

              return UsersService.hashPassword(password)
              .then(hashedPassword => {
                const newUser = {
                  user_name,
                  password: hashedPassword,
                  email
                }
                return UsersService.insertUser(
                  req.app.get('db'),
                  newUser
                )
                  .then(() => {
                    res
                      .status(201)
                      .json('success')
                  })
              })
          })
          .catch(next)
      })
    
    module.exports = usersRouter
    