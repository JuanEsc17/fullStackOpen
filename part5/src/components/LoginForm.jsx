import { useState } from "react"
import PropTypes from 'prop-types'
import Togglable from "./Togglable"

const LoginForm = ({ logIn }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            await logIn({ username, password })
            setUsername('')
            setPassword('')
        } catch (error) {
            console.error('Error en login:', error)
        }
    }

    return(
    <div>
        <Togglable buttonLabelShow="show login" buttonLabelHide='cancel'>
            <form onSubmit={handleLogin}>
                <div>
                <input 
                    type="text"
                    value={username}
                    name="Username"
                    placeholder='Username'
                    onChange={({target}) => setUsername(target.value)}
                />
                </div>
                <div>
                <input 
                    type='password'
                    value={password}
                    name='Password'
                    placeholder='Password'
                    onChange={({target}) => setPassword(target.value)}
                />
                </div>
                <div>
                <button id='form-login-button'>
                    Login
                </button>
                </div>
            </form>
        </Togglable>
    </div>
    )
}

LoginForm.propTypes = {
    logIn: PropTypes.func.isRequired
}

export default LoginForm
