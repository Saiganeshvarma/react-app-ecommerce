import React from "react"
import { useDispatch } from "react-redux"
import { deleteProduct } from "../slices/productSlice"

const DeleteProduct = ({ id }) => {
  const dispatch = useDispatch()

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?")

    if (confirmDelete) {
      dispatch(deleteProduct(id))
    }
  }

  return (
    <button
      onClick={handleDelete}
      style={{ marginLeft: "10px", background: "red", color: "white" }}
    >
      Delete
    </button>
  )
}

export default DeleteProduct 