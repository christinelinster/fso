import axios from 'axios'
import {useState} from 'react'
const Country = ({ country }) => {
    const api_key = import.meta.env.VITE_API_KEY
    const [lat, long] = country.latlng
    const [temp, setTemp] = useState('')
    const [weatherIcon, setWeatherIcon] = useState(null)
    const [speed, setSpeed] = useState(null)

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}&units=metric`)
        .then(response => {
            const weatherInfo = response.data
            setTemp(weatherInfo.main.temp)
            setWeatherIcon(`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`)
            setSpeed(weatherInfo.wind.speed)
        })



    return (
        <div >
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>

            <h2>Languages</h2>
            <ul>
                {country.languages
                    ? Object.values(country.languages).map((language, i) => (
                        <li key={i}>{language}</li>
                    ))
                    : null}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
            <h2>Weather in {country.name.common}</h2>
            <p>Temperature: {temp} Celsius</p>
            <img src={weatherIcon} />
            <p>Wind: {speed} m/s</p>
        </div>
    )
}

export default Country