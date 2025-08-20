import axios from "axios"

export const updateNote = (note) => {
    const request = axios.put(`http://localhost:3001/api/notes/${note.id}`, note)
    return request.then(response => response.data)
  }