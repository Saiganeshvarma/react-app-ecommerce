import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { updateProduct } from "../slices/productSlice"

const UpdateProduct = ({ product }) => {
  const dispatch = useDispatch()

  const [isEditing, setIsEditing] = useState(false)

  const [title, setTitle] = useState(product.title)
  const [description, setDescription] = useState(product.description)
  const [price, setPrice] = useState(product.price)
  const [image, setImage] = useState(null) // optional

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("price", price)

    // ✅ only append image if user selects new one
    if (image) {
      formData.append("image", image)
    }

    dispatch(updateProduct({ id: product._id, formData }))

    setIsEditing(false)
  }

  return (
    <div style={{ marginTop: "10px" }}>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button type="submit">Update</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      )}
    </div>
  )
}

export default UpdateProduct