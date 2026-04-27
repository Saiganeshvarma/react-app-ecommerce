import React from "react"
import AddNewProduct from "../Components/AddNewProduct"
import GetAllProducts from "../Components/GetAllProducts"

const Dashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Add Product */}
      <AddNewProduct />

      {/* All Products with Edit/Delete */}
      <GetAllProducts />
    </div>
  )
}

export default Dashboard