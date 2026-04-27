import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { addProduct, fetchProducts } from "../Slices/ProductSlice"

const AddNewProduct = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title || !description || !price) {
      alert("Fill all fields")
      return
    }

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("price", price)

    if (image) {
      formData.append("image", image)
    }

    dispatch(addProduct(formData))
      .then(() => {
        dispatch(fetchProducts()) // refresh list
        setTitle("")
        setDescription("")
        setPrice("")
        setImage(null)
      })
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AddNewProduct