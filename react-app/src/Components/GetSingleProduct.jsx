import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { fetchSingleProduct } from '../Slices/ProductSlice'
import TopNav from "./TopNav"

const GetSingleProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { singleProduct, loading, error } = useSelector(
    (state) => state.products
  )

  useEffect(() => {
    dispatch(fetchSingleProduct(id))
  }, [dispatch, id])

  if (loading) {
    return (
      <div className="app-shell">
        <TopNav title="Product" />
        <main className="page">
          <div className="container">
            <div className="card"><div className="card-body">Loading…</div></div>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app-shell">
        <TopNav title="Product" />
        <main className="page">
          <div className="container">
            <div className="card"><div className="card-body">{error}</div></div>
          </div>
        </main>
      </div>
    )
  }

  if (!singleProduct) {
    return (
      <div className="app-shell">
        <TopNav title="Product" />
        <main className="page">
          <div className="container">
            <div className="card"><div className="card-body">No Product Found</div></div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <TopNav title="Product details" />
      <main className="page">
        <div className="container">
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>← Back</button>

          <div style={{ height: 14 }} />

          <div className="grid" style={{ gridTemplateColumns: "1fr", gap: 14 }}>
            <div className="card" style={{ overflow: "hidden" }}>
              <div className="product-media" style={{ aspectRatio: "16 / 9" }}>
                {singleProduct.image?.url ? (
                  <img src={singleProduct.image?.url} alt={singleProduct.title} />
                ) : (
                  <div className="chip">No image</div>
                )}
              </div>
              <div className="card-body">
                <h1 className="page-title" style={{ marginBottom: 6 }}>{singleProduct.title}</h1>
                <p className="page-subtitle" style={{ marginBottom: 14 }}>{singleProduct.description}</p>
                <div className="price-row">
                  <div className="price" style={{ fontSize: 22 }}>₹ {singleProduct.price}</div>
                  <span className="chip">Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default GetSingleProduct