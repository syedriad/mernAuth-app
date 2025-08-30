import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toastHandleError, toastHandleSuccess } from '../utils'
import { ToastContainer } from 'react-toastify'

function Home({ setAuthenticated }) {
  const [loggedInUser, setLoggedInUser] = useState('')
  const [products, setProducts] = useState([])   // ✅ array
  const navigate = useNavigate()

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser')
    setAuthenticated(false)   // ✅ reset auth
    toastHandleSuccess("Logout Successfully")
    navigate('/login', { replace: true })
  }

  const fetchProduct = async () => {
    try {
      const url = "http://localhost:8080/products"
      const response = await fetch(url, {
        headers: { 'Authorization': localStorage.getItem('token') },
      })
      const result = await response.json()
      setProducts(result)
    } catch (error) {
      toastHandleError(error.message)
    }
  }

  useEffect(() => { fetchProduct() }, [])

  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {products.map((item, index) => (
          <ul key={index}>
            <span>{item.name}: {item.price}</span>
          </ul>
        ))}
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home
