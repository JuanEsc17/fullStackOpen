import axios from "axios";
const baseURL = '/api/persons/'

export const getAllPersons = () => {
    return axios
    .get(baseURL)
    .then(response => {
        const { data } = response
        return data
    })
}

export const deletePerson = (id) => {
    return axios
    .delete(baseURL + id)
    .then(() => {
        return getAllPersons()
    })
}

export const changeNumber = (person) => {
    console.log(person.id)
    return axios.put(baseURL + person.id, person)
    .then(response =>{
        console.log("salio bien :)")
        const { data } = response
        return data
    })
    .catch("No se pudo cambiar el numero")
}

export const createPerson = ({ name, number, id }) => {
    return axios
    .post(baseURL, {name, number, id})
    .then(response => {
        const { data } = response
        console.log(data)
        return data
    })
}