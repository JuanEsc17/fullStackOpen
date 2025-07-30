const Person = ({person}) => {
    return (
        <div>
            {person.name} - Number: {person.number}
        </div>
    )
}

export const AddPerson = (props) => {
    return (
        <form onSubmit={props.submit}>
        <div>
          name: <input type="text" onChange={props.changeName} value={props.newName}/>
        </div>
        <div>
            number: <input type="text" onChange={props.changeNumber} value={props.newNumber}/>
        </div>
        <div>
          <button>add</button>
        </div>
      </form>
    )
}

export const Numbers = ({persons, filter, deletePersona}) => {
    return(
        <div>
        {persons.filter((person) => person.name.toLowerCase().startsWith(filter))
         .map((person)=>{
            return (
            <div key={person.id}>
              <Person person={person}/>
                <button onClick={() => deletePersona(person)}>delete</button>
            </div>
            )
          })
        }
      </div>
    )
}