import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { toastHandleError, toastHandleSuccess } from '../utils'

function Login({ setAuthenticated }) {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginInfo({ ...loginInfo, [name]: value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    const { email, password } = loginInfo
    if (!email || !password) {
      return toastHandleError("Fields cannot be Empty!")
    }

    try {
      const api = "http://localhost:8080/auth/login"
      const response = await fetch(api, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      })

      const result = await response.json()
      const { success, message, jwtToken, name, error } = result

      if (success) {
        toastHandleSuccess(message)
        localStorage.setItem("token", jwtToken)
        localStorage.setItem("loggedInUser", name)
        setAuthenticated(true)    // ✅ update app state
        navigate("/home", { replace: true })
      } else if (error) {
        const msg = error?.details?.[0]?.message || "Something went wrong"
        toastHandleError(msg)
      } else {
        toastHandleError(message)
      }
    } catch (err) {
      toastHandleError(err.message)
    }
  }

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your Email..."
            value={loginInfo.email}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your Password..."
            value={loginInfo.password}
          />
        </div>

        <button type="submit">Login</button>
        <span>Don't have an account? <Link to="/signup">Signup</Link></span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login
