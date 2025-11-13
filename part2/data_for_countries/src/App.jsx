import { useState} from 'react'
import countriesService from './services/countries'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')


  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase()
    setSearch(searchTerm)

    if (searchTerm === '') {
      setCountries([])
    } else {
      countriesService
        .getAll()
        .then(allCountries => {
          const filteredCountries = allCountries.filter(country =>
            country.name.common.toLowerCase().includes(searchTerm) ||
            country.name.official.toLowerCase().includes(searchTerm))
          setCountries(filteredCountries)
        })
    }
  }


  const handleShow = (event) => {
    const countryName = event.target.value.toLowerCase()
    countriesService
      .getCountry(countryName)
      .then(countryData => {
        setCountries([countryData])
      })

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
          ? <Country country={countries[0]}/>
          : countries.map(country => (
            <div key={country.name.common}>{country.name.official}<button onClick={handleShow} value={country.name.common}>show</button></div>
          ))

      }

    </div>
  )
}

export default App