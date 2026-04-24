import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../slices/authSlice"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    
    navigate("/login")
  }

  return (
    <div style={{ padding: "20px" }}>
      
      {/* Top Bar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2>Welcome {user?.name || "User"} 👋</h2>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Content */}
      <div style={{ marginTop: "40px" }}>
        <h3>Home Page</h3>
        <p>You are successfully logged in 🎉</p>
      </div>

    </div>
  )
}

export default Home