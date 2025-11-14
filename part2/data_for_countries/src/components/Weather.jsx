import { useState, useEffect } from "react"
import axios from 'axios'

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather'
const WEATHER_API_KEY = import.meta.env.VITE_API_KEY


const Weather = ({country}) => {
    const [weather, setWeather] = useState(null)

     useEffect(() => {
        const [lat, lon] = country.latlng
        const url = `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        axios
            .get(url)
            .then(response => setWeather(response.data))
     })

     if (!weather){
        return null
     }

     const weatherIcon = weather.weather[0].icon
     const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`

     return (
        <div>
            <h2>Weather in {country.capital} </h2>
            <div>Temperature {weather.main.temp} Celsius</div>
            <img src={weatherIconUrl} alt={`Weather iconm of ${weather.weather[0].description}`} />
            <div>Wind {weather.wind.speed} m/s</div>
        </div>
     )
}

export default Weather


