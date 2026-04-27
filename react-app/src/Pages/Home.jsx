import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../slices/authSlice"
import { useNavigate } from "react-router-dom"
import GetAllProducts from '../Components/getAllProducts'
import GetSingleProduct from '../Components/GetSingleProduct'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    
    navigate("/login")
  }

  return (
    <div>
        <button onClick={handleLogout}>
          Logout
        </button>
        <GetAllProducts/>
        <GetSingleProduct/>

    </div>
  )
}

export default Home