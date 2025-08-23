import { useImperativeHandle, useState, forwardRef } from "react"

const Message = forwardRef((props, ref) => {
    const [message, setMessage] = useState(null)
    const [messageStyle, setMessageStyle] = useState(null)

    const showMessage = (style, newMessage) => {
        setMessage(newMessage)
        setMessageStyle(style)
        
        setTimeout(() => {
            setMessage(null)
            setMessageStyle(null)
        }, 5000)
    }

    useImperativeHandle(ref, () => ({
        showMessage
    }))

    if (!message) {
        return null
    }
    
    return (
        <div className={messageStyle}>
            {message}
        </div>
    )
})

export default Message