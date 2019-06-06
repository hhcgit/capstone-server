require('dotenv').config();
module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    PLANT_API_KEY:process.env.PLANT_API_KEY,
    WEATHER_API_KEY:process.env.WEATHER_API_KEY,  
    DB_URL:process.env.DB_URL,
    JWT_SECRET:process.env.JWT_SECRET,
    EMAIL:process.env.EMAIL,
    PASS:process.env.PASS
}
