import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Home from "./Pages/Home"
import Dashboard from "./Pages/Dashboard"
import GetSingleProduct from "./Components/GetSingleProduct"

const App = () => {
  const { user, token } = useSelector((state) => state.auth)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />

        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/login" />}
        />

        <Route
          path="/product/:id"
          element={token ? <GetSingleProduct /> : <Navigate to="/login" />}
        />

        <Route
          path="/dashboard"
          element={
            token && user?.role === "admin"
              ? <Dashboard />
              : <Navigate to="/login" />
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App