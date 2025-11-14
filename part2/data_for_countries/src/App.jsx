import { useState, useEffect } from 'react'

import axios from 'axios'
import CountryList from './components/CountryList'

const COUNTRY_API_URL = 'https://studies.cs.helsinki.fi/restcountries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get(`${COUNTRY_API_URL}/api/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <p>
        find countries
        <input onChange={(event) => {setSearch(event.target.value)}} value={search} type="text" />
      </p>
      {search === '' ? null : (
        <CountryList countries={filteredCountries} showCountry={setSearch}/>
      )}

    </div>
  )
}

export default App