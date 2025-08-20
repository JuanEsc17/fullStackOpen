import { useState } from "react"

const Togglable = ({ children, buttonLabelShow, buttonLabelHide }) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : ''}
    const showWhenVisible = { display: visible ? '' : 'none' }
    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={() => setVisible(true)}>
                    {buttonLabelShow}
                </button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button onClick={() => setVisible(false)}>
                    {buttonLabelHide}
                </button>
            </div>
        </div>
    )
}

export default Togglable