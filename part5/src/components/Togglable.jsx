import { forwardRef, useState, useImperativeHandle } from "react"
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ children, buttonLabelShow = 'show', buttonLabelHide = 'hide'}, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : ''}
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => setVisible(!visible)

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>
                    {buttonLabelShow}
                </button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button onClick={toggleVisibility}>
                    {buttonLabelHide}
                </button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabelShow: PropTypes.string,
    buttonLabelHide: PropTypes.string
}

export default Togglable