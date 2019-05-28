config = require('../config');


const weatherApi ={
    getWeather(ip){
        const baseipUrl = "http://dataservice.accuweather.com/locations/v1/cities/ipaddress?q="
        const baseUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/"
        return fetch(baseipUrl+ip+"&apikey="+config.WEATHER_API_KEY, {
            method: 'get'
        })
        .then(res => res.json())
        .then(loc => {
            let locKey = loc.Key
            return fetch(baseUrl+locKey+'?apikey='+config.WEATHER_API_KEY)
        })
        .then(w => w.json())
        .catch(err => console.log('request failed', err))
    }
}
module.exports = weatherApi