const Message = ({ messageStyle, message }) => {
    return (
        <h2 className={messageStyle}>{message}</h2>
    )
}

export default Message