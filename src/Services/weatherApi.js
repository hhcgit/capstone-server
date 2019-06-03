config = require('../config');
const fetch =require('node-fetch');

const weatherApi ={
    getWeather(locKey){
        const baseUrl = "https://dataservice.accuweather.com/forecasts/v1/daily/1day/"
        return fetch(baseUrl+locKey+"?apikey="+config.WEATHER_API_KEY, {
            method: 'get'
        })
        .then(res => res.json())
       
        .catch(err => console.log('request failed', err))
    }
}
module.exports = weatherApi