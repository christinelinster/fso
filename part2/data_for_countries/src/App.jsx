import { useState} from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')


  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase()
    setSearch(searchTerm)
    if (searchTerm === '') {
      setCountries([])
    } else {
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          const allCountries = response.data
          const filteredCountries = allCountries.filter(country =>
            country.name.common.toLowerCase().includes(searchTerm) ||
            country.name.official.toLowerCase().includes(searchTerm))
          setCountries(filteredCountries)
        })
    }
  }

  return (
    <div>
      <p>
        find countries
        <input onChange={handleSearch} value={search} type="text" />
      </p>

      {countries.length > 10
        ? <p>Too many matches, specify another filter</p>
        : countries.length === 1
          ? countries.map(country => (
            <div key={country.name.common}>
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
              <img src={country.flags.png} alt={country.flags.alt}/>

            </div>
          ))
          : countries.map(country => (
            <div key={country.name.common}>{country.name.official}</div>
          ))

      }

    </div>
  )
}

export default App