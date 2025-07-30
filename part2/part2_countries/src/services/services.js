import axios from 'axios'

export const getCountries = () => {
    return axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => {
        return response.data
    })
}

export const getCountry = ( name ) => {
    return axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
    .then(response => response.data)
}