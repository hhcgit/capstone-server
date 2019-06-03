const express = require('express');
const weatherRouter = express.Router();
const bodyParser = express.json();
const weatherApi = require('../Services/weatherApi')



weatherRouter
.route('/:locKey')
.get(bodyParser, (req,res,next) => { 
    const { locKey } = req.params
    if(!locKey){
        return res.status(400).json({
            error:'Missing Location Key in request body'
        });
    }
    return weatherApi.getWeather(locKey).then(weather=> {
        const { Day, Night } = weather.DailyForecasts[0]
        const out = [Day, Night]
        return res.json(out)
    })
        
    .catch(err => console.log('request failed',err))

  })
  module.exports = weatherRouter