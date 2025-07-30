export const Note = ({ content, date, important, toggleImportance, id }) => {
  const label = important 
        ? 'make not important'
        : 'make important'

  return <li className='note'>
      <p>{content}</p>
      <small>
        {date}
      </small>
      <button onClick={() => toggleImportance(id)}>{label}</button>
    </li>
}

export const Notification = ({ message }) => {
  if ( message === null ){
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}