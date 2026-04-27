import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { fetchProducts } from '../Slices/ProductSlice'
import { useNavigate } from "react-router-dom"

import DeleteProduct from "./DeleteProduct"
import UpdateProduct from "./UpdateProducts"

const GetAllProducts = () => {
  const { items, loading, error } = useSelector((state) => state.products)
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (loading) return <div className="card"><div className="card-body">Loading…</div></div>
  if (error) return <div className="card"><div className="card-body">{error}</div></div>

  return (
    <div className="grid grid-products">
      {items.map((product) => (
        <div key={product._id} className="card product-card">
          <div
            className="product-media"
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/product/${product._id}`)}
          >
            {product.image?.url ? (
              <img src={product.image?.url} alt={product.title} />
            ) : (
              <div className="chip">No image</div>
            )}
          </div>

          <div className="card-body">
            <h3 className="product-title">{product.title}</h3>
            <p className="product-desc">{product.description}</p>

            <div className="price-row">
              <div className="price">₹ {product.price}</div>
              <button className="btn btn-ghost" onClick={() => navigate(`/product/${product._id}`)}>
                View
              </button>
            </div>

            {user?.role === "admin" && (
              <div className="actions-row">
                <UpdateProduct product={product} />
                <DeleteProduct id={product._id} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default GetAllProducts