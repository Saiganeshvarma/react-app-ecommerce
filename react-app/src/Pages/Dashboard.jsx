import React from 'react'
import GetAllProducts from '../Components/getAllProducts'
import AddNewProduct from '../Components/AddNewProduct'
import UpdateProducts from '../Components/UpdateProducts'
import DeleteProduct from '../Components/DeleteProduct'
import GetSingleProduct from '../Components/GetSingleProduct'

const Dashboard = () => {
    
  return (
    <div>
      <GetAllProducts/>
      <GetSingleProduct/>
      <AddNewProduct/>
      <UpdateProducts/>
      <DeleteProduct/>



      




    </div>
  )
}

export default Dashboard