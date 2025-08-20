import { useState } from 'react'
import { useEffect } from 'react' // permite ejecutar una funcion solo la primera vez que se renderiza
import { Note, Notification } from './components/Note'
import { getAllNotes } from './services/getAllNotes'
import { createNote } from './services/createNote'
import { updateNote } from './services/updateNote'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}

const App = () =>{
 const [notes, setNotes] = useState([])
 const [newNote, setNewNote] = useState("")
 const [showAll, setShowAll] = useState(true)
 const [loading, setLoading] = useState(true)
 const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() =>{
    setLoading(true)
    getAllNotes().then(data => {
      setNotes(data)
      setLoading(false)
    })
  }, [])
 
 const handleShowAll = () => {
    setShowAll(() => !showAll)
 }

 const handleChange = (event) => {
    setNewNote(event.target.value)
 }

 const handleSubmit = (event) => {
    event.preventDefault()
    console.log("crear nota")
    const noteToAddToState = {
        userId: notes.length + 1,
        content: newNote,
        date: new Date().toISOString(),
    }
    createNote(noteToAddToState).then(data => {setNotes([...notes, data])})
    setNewNote("")
 }

 const toggleImportanceOf = id => {
  const note = notes.find(n => n.id === id)
  const changedNote = { ...note, important: !note.important}

  updateNote(changedNote).then(returnedNote => {
    setNotes(notes.map(note => note.id !== id ? note : returnedNote))
  })
  .catch(() => {
    setErrorMessage(
      `Note '${note.content}' was already removed from server`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    setNotes(notes.filter(n => n.id !== id))
  })
 }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <strong>
      {
        loading
          ? "Cargando..." : ""
      }
      </strong>
      <button onClick={handleShowAll}>{showAll ? "Show only important" : "Show all"}</button>
      <ol>
        {notes.filter(note => {
            if (showAll === true) return note
            return note.important === true
        })
        .map(note => 
          <Note key={note.id} {...note} toggleImportance={toggleImportanceOf} />
        )}
      </ol>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote}/>
        <button>Crear nota</button>
      </form>
      <Footer/>
    </div>
  )
}

export default App