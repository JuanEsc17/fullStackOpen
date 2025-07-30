import { useState, useEffect } from 'react'
import { getCountries, getCountry } from './services/services'
import './App.css'

const Country = ( { name } ) => {
  const [countryData, setCountryData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCountry(name.toLowerCase())
    .then(data => {
      setCountryData(data)
      setLoading(false)
    })
    .catch(error => {
      console.error('Error fetching country: ', error)
      setLoading(false)
    })
  }, [name])

  if (loading) return <div>Loading...</div>
  if(!countryData) return <div>Country not found</div>

  return (
    <div>
      <h1>{countryData.name.common}</h1>
      <p>Capital: {countryData.capital}</p>
      <p>Area: {countryData.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(countryData.languages).map((language, index) => <li key={index}>{language}</li>)}
      </ul>
      <img src={countryData.flags.png} alt={`Flag of ${countryData.name.commun}`}/>
    </div>
  )
}

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [newSearch, setNewSearch] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    getCountries().then(response => setAllCountries(response))
  }, [])

  const handleChange = (event) => {
    const searchValue =  event.target.value.toLowerCase()
    setNewSearch(event.target.value.toLowerCase())
    const filteredCountries = allCountries.filter((country) => country.name.official.toLowerCase().includes(searchValue))
    setCountries(filteredCountries)
    console.log(filteredCountries)
  }

  return (
    <div>
      <p>countries</p>
      <input type="text" onChange={handleChange}/>
      <div>
        {
          countries.length > 10 ? "Too many matches, specify another filter"
          : countries.length > 1 ? countries.map((country) => {
            return(
            <div key={country.name.common}>
              {country.name.common}
              <button>Show</button>
              </div>
            )
        })
          : countries.length === 1 ? <Country name={countries[0].name.common}/>
          : <p>no hay xd</p>
        }
      </div>
    </div>
  )
}

export default App
