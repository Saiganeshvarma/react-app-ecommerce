import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../Slices/authSlice"
import "./TopNav.css"

const TopNav = ({ title = "Shop" }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const cartItems = useSelector((state) => state.cart.items)
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0)

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  return (
    <header className="nav">
      <div className="container nav-inner">

        {/* Brand */}
        <div className="brand" role="button" tabIndex={0} onClick={() => navigate("/home")}>
          <div className="nav-logo">
            <span>S</span>
          </div>
          <div className="nav-brand-text">
            <span className="nav-brand-name">ShopLux</span>
            <span className="nav-brand-sub">{title}</span>
          </div>
        </div>

        {/* Actions */}
        <nav className="nav-actions">
          <button className="nav-link" onClick={() => navigate("/home")}>Home</button>

          {user?.role === "admin" && (
            <button className="nav-link" onClick={() => navigate("/dashboard")}>Dashboard</button>
          )}

          {user?.role !== "admin" && (
            <button className="nav-link cart-nav-btn" onClick={() => navigate("/cart")}>
              <span className="nav-link-icon">🛒</span>
              Cart
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          )}

          {user?.role !== "admin" && (
            <button className="nav-link" onClick={() => navigate("/orders")}>
              <span className="nav-link-icon">📦</span>
              Orders
            </button>
          )}

          <button className="nav-link" onClick={() => navigate("/profile")}>
            <span className="nav-link-icon">👤</span>
            Profile
          </button>

          <button className="nav-logout" onClick={handleLogout}>
            Logout
          </button>
        </nav>

      </div>
    </header>
  )
}

export default TopNav
