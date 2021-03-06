const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {NODE_ENV} = require('./config')
const weatherRouter = require('./Weather/weather-router')
const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')
const postsRouter = require('./reviews/reviews-Router')
const emailRouter = require('./email/email-Router')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())

app.get('/', (req,res) => {
    res.send('Hello, world!')
})
app.use('/api/weather',weatherRouter);
app.use('/api/auth',authRouter);
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter)
app.use('/api/email', emailRouter)

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV ==='production') {
        response = {error: { message: 'server error'}}
    } else{
        console.error(error)
        response = {message: error.message, error}
    }
    res.status(500).json(response)
})
// const whitelist = ['http://localhost:3000', 'http://my-project.com'];
// const options = {
//   origin: function (origin,callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// };
// app.use(cors(options));
module.exports = app