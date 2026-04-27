import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const BASE_URL = "http://localhost:3000/api/productRoutes"

// GET ALL
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth

      const res = await fetch(`${BASE_URL}/products`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      const data = await res.json()

      if (!res.ok) throw new Error("Fetch failed")

      return data.products
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// GET SINGLE
export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingle",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth

      const res = await fetch(`${BASE_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      const data = await res.json()

      if (!res.ok) throw new Error("Fetch failed")

      return data.singleProduct
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// ADD
export const addProduct = createAsyncThunk(
  "products/add",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth

      const res = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      })

      const data = await res.json()
      if (!res.ok) throw new Error("Add failed")

      return data.product
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// UPDATE
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, formData }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth

      const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      })

      const data = await res.json()
      if (!res.ok) throw new Error("Update failed")

      return data.data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// DELETE
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth

      const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!res.ok) throw new Error("Delete failed")

      return id
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    singleProduct: null,
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        state.items = state.items.map(p =>
          p._id === action.payload._id ? action.payload : p
        )
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p._id !== action.payload)
      })
  }
})

export default productSlice.reducer