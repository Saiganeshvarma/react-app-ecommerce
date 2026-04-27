import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { fetchProducts } from '../Slices/productSlice'
import { useNavigate } from "react-router-dom"

const GetAllProducts = () => {
  const { items, loading, error } = useSelector((state) => state.products)
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
          onClick={() => navigate(`/product/${product._id}`)}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
            cursor: "pointer"
          }}
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
      ))}
    </div>
  )
}

export default GetAllProducts