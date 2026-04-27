import React, { useEffect } from 'react'
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

  if (loading) return <h2>Loading...</h2>
  if (error) return <h2>{error}</h2>

  return (
    <div>
      <h1>All Products</h1>

      {items.map((product) => (
        <div
          key={product._id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px"
          }}
        >
          {/* 👉 CLICK ONLY ON CONTENT, NOT BUTTONS */}
          <div
            onClick={() => navigate(`/product/${product._id}`)}
            style={{ cursor: "pointer" }}
          >
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <h3>₹ {product.price}</h3>

            <img
              src={product.image?.url}
              alt={product.title}
              width="150"
            />
          </div>

          {/* ✅ ADMIN ONLY BUTTONS */}
          {user?.role === "admin" && (
            <div style={{ marginTop: "10px" }}>
              <UpdateProduct product={product} />
              <DeleteProduct id={product._id} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default GetAllProducts