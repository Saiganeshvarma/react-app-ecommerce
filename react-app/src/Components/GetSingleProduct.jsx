import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { fetchSingleProduct } from '../Slices/productSlice'

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

  if (loading) return <h2>Loading...</h2>
  if (error) return <h2>{error}</h2>
  if (!singleProduct) return <h2>No Product Found</h2>

  return (
    <div>
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <h1>{singleProduct.title}</h1>

      <img
        src={singleProduct.image?.url}
        alt={singleProduct.title}
        width="250"
      />

      <p>{singleProduct.description}</p>
      <h2>₹ {singleProduct.price}</h2>
    </div>
  )
}

export default GetSingleProduct