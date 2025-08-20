import { useState } from "react"
import loginService from '../services/login'

const LoginForm  = ({ logIn }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        const user = await loginService.login({
            username,
            password
        })

        setUsername('')
        setPassword('')
        logIn(user)
    }

    return(
    <div>
        <div>
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
                <button>
                    Login
                </button>
                </div>
            </form>
        </div>
    </div>
    )
  }

export default LoginForm
