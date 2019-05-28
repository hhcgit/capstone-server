const express = require('express');
const weatherRouter = express.Router();
const bodyParser = express.json();
const weatherApi = require('../Services/weatherApi')

weatherRouter
.route('/')
.get(bodyParser, (req,res,next) => { 
    const { ip } = req.body
    if(!ip){
        return res.status(400).json({
            error:'Missing IP adress in request body'
        });
    }
    res.status(200).send(ip)
    // weatherApi.getWeather(ip)
    // .then(weather => {
    //   res.send(weather)
    // })

  })
  module.exports = weatherRouter