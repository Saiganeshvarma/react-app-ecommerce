import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Dashboard from "./Pages/Dashboard"

const App = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* User + Admin */}
        <Route path="/home" element={<Home />} />

        {/* Admin Only */}
        <Route
          path="/dashboard"
          element={
            user?.role === "admin"
              ? <Dashboard />
              : <Navigate to="/home" />
          }
        />

        {/* Default redirect */}
        <Route
          path="*"
          element={
            user?.role === "admin"
              ? <Navigate to="/dashboard" />
              : <Navigate to="/home" />
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App