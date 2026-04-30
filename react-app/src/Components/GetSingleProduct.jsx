import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { fetchSingleProduct } from '../Slices/ProductSlice'
import { addToCart } from '../Slices/CartSlice'
import { toast, Toaster } from "react-hot-toast"
import TopNav from "./TopNav"
import "./GetSingleProduct.css"

const GetSingleProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { singleProduct, loading, error } = useSelector((state) => state.products)
  const { user } = useSelector((state) => state.auth)
  const { actionLoading } = useSelector((state) => state.cart)

  useEffect(() => { dispatch(fetchSingleProduct(id)) }, [dispatch, id])

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: id, quantity: 1 }))
      .unwrap()
      .then(() => toast.success("Added to cart 🛒"))
      .catch((err) => toast.error(err || "Failed to add"))
  }

  if (loading) return (
    <div className="app-shell">
      <TopNav title="Product" />
      <main className="page">
        <div className="container">
          <div className="sp-skeleton">
            <div className="sp-skeleton-img" />
            <div className="sp-skeleton-body">
              <div className="sp-skeleton-line sp-skeleton-line--title" />
              <div className="sp-skeleton-line" />
              <div className="sp-skeleton-line sp-skeleton-line--short" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )

  if (error || !singleProduct) return (
    <div className="app-shell">
      <TopNav title="Product" />
      <main className="page">
        <div className="container">
          <div className="card card-body">{error || "No product found."}</div>
        </div>
      </main>
    </div>
  )

  return (
    <div className="app-shell">
      <Toaster />
      <TopNav title="Product details" />
      <main className="page">
        <div className="container">

          <button className="btn btn-ghost sp-back" onClick={() => navigate(-1)}>
            ← Back
          </button>

          <div className="sp-layout">

            {/* IMAGE */}
            <div className="sp-image-wrap">
              {singleProduct.image?.url ? (
                <img src={singleProduct.image.url} alt={singleProduct.title} className="sp-image" />
              ) : (
                <div className="sp-no-image">📦</div>
              )}
            </div>

            {/* DETAILS */}
            <div className="sp-details">
              <p className="sp-category">Product Details</p>
              <h1 className="sp-title">{singleProduct.title}</h1>
              <p className="sp-desc">{singleProduct.description}</p>

              <div className="sp-price-block">
                <span className="sp-price">₹ {singleProduct.price?.toLocaleString()}</span>
                <span className="sp-badge">In Stock</span>
              </div>

              <div className="sp-divider" />

              <div className="sp-meta">
                <div className="sp-meta-item">
                  <span className="sp-meta-label">Shipping</span>
                  <span className="sp-meta-value">Free delivery</span>
                </div>
                <div className="sp-meta-item">
                  <span className="sp-meta-label">Returns</span>
                  <span className="sp-meta-value">30-day returns</span>
                </div>
                <div className="sp-meta-item">
                  <span className="sp-meta-label">Payment</span>
                  <span className="sp-meta-value">Secure checkout</span>
                </div>
              </div>

              <div className="sp-divider" />

              {user?.role !== "admin" && (
                <div className="sp-actions">
                  <button
                    className="btn btn-primary sp-btn-buy"
                    onClick={handleAddToCart}
                    disabled={actionLoading}
                  >
                    {actionLoading ? "Adding…" : "🛒 Add to Cart"}
                  </button>
                  <button
                    className="btn sp-btn-cart"
                    onClick={() => navigate("/cart")}
                  >
                    View Cart
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default GetSingleProduct
