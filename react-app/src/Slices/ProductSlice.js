import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:3000/api/productRoutes";

// ✅ GET ALL PRODUCTS (token added)
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (_, { getState }) => {
    const { token } = getState().auth;

    const res = await fetch(`${BASE_URL}/products`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    return data.products;
  }
);

// ✅ GET SINGLE PRODUCT (token added)
export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingle",
  async (id, { getState }) => {
    const { token } = getState().auth;

    const res = await fetch(`${BASE_URL}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    return data.singleProduct;
  }
);

// ✅ ADD PRODUCT
export const addProduct = createAsyncThunk(
  "products/add",
  async (formData, { getState }) => {
    const { token } = getState().auth;

    const res = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    return await res.json();
  }
);

// ✅ UPDATE PRODUCT
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, formData }, { getState }) => {
    const { token } = getState().auth;

    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    return await res.json();
  }
);

// ✅ DELETE PRODUCT
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { getState }) => {
    const { token } = getState().auth;

    await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return id;
  }
);

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

      // 🔹 GET ALL
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch products";
      })

      // 🔹 GET SINGLE
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch product";
      })

      // 🔹 ADD
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload.product);
      })

      // 🔹 UPDATE
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.items = state.items.map(p =>
          p._id === action.payload.data._id ? action.payload.data : p
        );

        if (state.singleProduct?._id === action.payload.data._id) {
          state.singleProduct = action.payload.data;
        }
      })

      // 🔹 DELETE
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p._id !== action.payload);

        if (state.singleProduct?._id === action.payload) {
          state.singleProduct = null;
        }
      });
  }
});

export default productSlice.reducer;