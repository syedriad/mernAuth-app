import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { toastHandleError, toastHandleSuccess } from '../utils'

function Signup() {
  const [signinInfo, setSignInfo] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setSignInfo({ ...signinInfo, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, password } = signinInfo

    if (!name || !email || !password) {
      return toastHandleError("Fields cannot be Empty!")
    }

    try {
      const api = "http://localhost:8080/auth/signup"
      const response = await fetch(api, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signinInfo),
      })

      const result = await response.json()
      const { success, message, error } = result

      if (success) {
        toastHandleSuccess(message)
        navigate('/login', { replace: true })
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
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your Name..."
            value={signinInfo.name}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your Email..."
            value={signinInfo.email}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your Password..."
            value={signinInfo.password}
          />
        </div>

        <button type="submit">Signup</button>
        <span>Already have an account? <Link to="/login">Login</Link></span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Signup
