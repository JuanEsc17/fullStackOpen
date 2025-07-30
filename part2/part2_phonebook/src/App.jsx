import { useState } from 'react'
import { useEffect } from 'react'
import { getAllPersons, createPerson, deletePerson, changeNumber } from './services/numberServices'
import { Numbers, AddPerson } from './components/Person'
import { Filter } from './components/Filter'
import { Message } from './components/Message'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageStyle, setMessageStyle] = useState(null)

  useEffect(()=>{
    getAllPersons().then(response => setPersons(response))
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase())
  }
  
  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }
  
  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  } 

  const handleSubmit = (event) => {
    event.preventDefault()
    const personToAddToState = {
        name: newName,
        number: newNumber,
    }
    const personFlag = persons.find((person) => person.name === newName)
    if (personFlag === undefined){
      createPerson(personToAddToState).then(response => {
        setPersons([...persons, response])
        setMessageStyle('message')
        setMessage(`Added ${personToAddToState.name}`)
        setTimeout(() => { setMessage(null)}, 4000)
    })
    .catch(() => {
      setMessageStyle('error')
      setMessage(`Person validation failed: name "${personToAddToState.name}" is shorter than the minimum allowed length (3)`)
    })
    }
    else{
        if (window.confirm(`${newName} is already added to phonebook, replace de number with a new one?`)){
          const newPerson = {
            ...personFlag,
            number: newNumber
          }
          changeNumber(newPerson)
          .then(response => setPersons(persons.map(person => person.id === response.id ? response : person)))
          .catch(() => {
            setMessageStyle('error')
            setMessage(`Information of ${personToAddToState.name} has already been removed from server`)
          })
        }
    }
    setNewName("")
    setNewNumber("")
  }

  const handleDelete = (person) =>{
    if(window.confirm(`Delete ${person.name}?`))
      deletePerson(person.id).then(allPersons => setPersons(allPersons))
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Message message={message} style={messageStyle}/>
      <Filter function={handleFilter}/>
      <h2>add a new</h2>
      <AddPerson submit={handleSubmit} changeName={handleChangeName} changeNumber={handleChangeNumber} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Numbers persons={persons} filter={filter} deletePersona={handleDelete}/>
    </div>
  )
}

export default App