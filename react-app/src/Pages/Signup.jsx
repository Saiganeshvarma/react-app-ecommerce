import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { toast, Toaster } from "react-hot-toast"
import { registerUser } from '../slices/authslice'
import { useNavigate } from "react-router-dom"
import "./Signup.css"
import Navbar from '../Components/NavBar'

const Signup = () => {
  const dispatch = useDispatch()
  const { user, loading, error } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !email || !password) {
      return toast.error("Fill all the details")
    }

    dispatch(registerUser({ name, email, password }))
  }

  useEffect(() => {
    if (user) {
      toast.success("Account created 🎉")
      setTimeout(() => {
        navigate("/login")
      }, 1000)
    }

    if (error) {
      toast.error(error)
    }
  }, [user, error, navigate])

  return (
    <div className="signup-container">
      <Toaster />

      {/* LEFT SIDE IMAGE */}
      <div className="signup-left">
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da"
          alt="ecommerce"
        />
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="signup-right">
        <div className="signup-box">
          <h2>Create Account</h2>
          <p>Join us and start shopping 🛍️</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="login-text">
            Already have an account? <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup