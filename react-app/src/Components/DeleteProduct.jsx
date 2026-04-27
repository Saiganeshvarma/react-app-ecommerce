import React from "react"
import { useDispatch } from "react-redux"
import { deleteProduct, fetchProducts } from "../Slices/ProductSlice"

const DeleteProduct = ({ id }) => {
  const dispatch = useDispatch()

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure?")

    if (confirmDelete) {
      dispatch(deleteProduct(id))
        .then(() => {
          dispatch(fetchProducts()) // refresh UI
        })
    }
  }

  return (
    <button
      onClick={handleDelete}
      style={{
        marginLeft: "10px",
        background: "red",
        color: "white",
        border: "none",
        padding: "5px 10px"
      }}
    >
      Delete
    </button>
  )
}

export default DeleteProduct