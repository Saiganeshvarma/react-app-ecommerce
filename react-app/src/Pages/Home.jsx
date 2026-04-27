import React from 'react'
import { useDispatch } from "react-redux"
import { logout } from "../Slices/authSlice"
import { useNavigate } from "react-router-dom"
import GetAllProducts from '../Components/GetAllProducts'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <GetAllProducts />
    </div>
  )
}

export default Home