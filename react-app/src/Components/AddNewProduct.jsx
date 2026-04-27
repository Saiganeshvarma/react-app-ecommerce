import React, { useState } from 'react'

import {useDispatch} from "react-redux"
import { addProduct } from '../Slices/productSlice'

const AddNewProduct = () => {
  var dispatch = useDispatch()
  var [title,setTitle] = useState("")
  var [description,setDescription] = useState("")
  var [price,setPrice] = useState("")
  var [image,setImage] = useState(null)

  var handleSubmit = (e)=>{
    e.preventDefault()
    var formData = new FormData()
    formData.append("title",title)
    formData.append("description",description)
    formData.append("price",price)
    formData.append("image",image)
  }
  dispatch(addProduct(formData))

  return (
    <div>
      <form onSubmit={handleSubmit} action="">
      <h1>Add new product</h1>
      <label htmlFor="">Enter Product title</label>
      <input value={title} onChange={(e)=>{setTitle(e.target.value)}} type="text" />
      <label htmlFor="">Enter Product Description</label>
      <input value={description} onChange={(e)=>{setDescription(e.target.value)}} type="text" />
      <label htmlFor="">Enter product Price</label>
      <input value={price} onChange={(e)=>{setPrice(e.target.value)}} type="text" />
      <label htmlFor="">Enter Product image</label>
      <input type="file" value={image} onChange={(e)=>{setImage(e.target.files[0])}} />
      <button type='submit'>Add  Product</button>
      </form>


    </div>
  )
}

export default AddNewProduct