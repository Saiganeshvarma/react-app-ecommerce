import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateProduct, fetchProducts } from "../Slices/ProductSlice"

const UpdateProduct = ({ product }) => {
  const dispatch = useDispatch()

  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(product.title)
  const [description, setDescription] = useState(product.description)
  const [price, setPrice] = useState(product.price)
  const [image, setImage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("price", price)

    if (image) {
      formData.append("image", image)
    }

    dispatch(updateProduct({ id: product._id, formData }))
      .then(() => {
        dispatch(fetchProducts()) // refresh UI
        setIsEditing(false)
      })
  }

  return (
    <div>
      {isEditing ? (
        <form className="form" onSubmit={handleSubmit}>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input className="input" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input className="input" value={price} onChange={(e) => setPrice(e.target.value)} />

          <input className="file" type="file" onChange={(e) => setImage(e.target.files[0])} />

          <div className="actions-row">
            <button className="btn btn-primary" type="submit">Save</button>
            <button className="btn" type="button" onClick={() => setIsEditing(false)}>
            Cancel
            </button>
          </div>
        </form>
      ) : (
        <button className="btn" onClick={() => setIsEditing(true)}>Edit</button>
      )}
    </div>
  )
}

export default UpdateProduct