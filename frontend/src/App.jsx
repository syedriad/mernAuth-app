import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Home from "./Pages/Home"
import { useState } from "react"
import RefreshHandler from "./components/RefreshHandler"

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false)

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />
  }

  return (
    <div>
      <RefreshHandler setAuthenticated={setAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home setAuthenticated={setAuthenticated} />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
