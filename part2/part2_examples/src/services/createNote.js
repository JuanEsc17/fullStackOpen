import axios from "axios"

export const createNote = ({ content, date, userId }) =>{
    return axios.post('http://localhost:3001/api/notes', { content, date, userId })
    .then(response => {
      const { data } = response
      return data
    })
}