import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { toast, Toaster } from "react-hot-toast"
import { loginUser } from '../slices/authslice'
import { useNavigate } from "react-router-dom"
import "./Login.css"

const Login = () => {
  const dispatch = useDispatch()
  const { loading, error, token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()

    if (!email || !password) {
      return toast.error("Fill email and password")
    }

    dispatch(loginUser({ email, password }))
  }

  useEffect(() => {
    if (token) {
      toast.success("Login successful 🎉")
      setTimeout(() => {
        navigate("/home")
        setEmail("")
        setPassword("")
      }, 1000)
    }
  }, [token, navigate])

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  return (
    <div className="login-container">
      <Toaster />

      {/* LEFT IMAGE */}
      <div className="login-left">
        <img
          src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a"
          alt="ecommerce"
        />
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="login-right">
        <div className="login-box">
          <h2>Welcome Back 👋</h2>
          <p>Login to continue shopping</p>

          <form onSubmit={handleLogin}>
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
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="signup-text">
            Don't have an account?{" "}
            <span onClick={() => navigate("/")}>Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login