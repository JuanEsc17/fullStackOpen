export const Message = ( {message, style} ) => {
    if ( message === null ){
    return null
  }

  return (
    <div className={style}>
      {message}
    </div>
  )
}