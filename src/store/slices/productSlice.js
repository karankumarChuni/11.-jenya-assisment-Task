import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ skip = 0, limit = 20, category = "" }, { rejectWithValue }) => {
    try {
      let response;
      let total;

      if (category) {
        response = await axios.get(
          `https://dummyjson.com/products/category/${category}`
        );
        total = response.data.products.length; // Since API doesn't return total count for categories
      } else {
        response = await axios.get(
          `https://dummyjson.com/products?skip=${skip}&limit=${limit}`
        );
        total = response.data.total; // Normal case, API includes total
      }

      return { products: response.data.products, total };
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products/categories"
      );

      if (Array.isArray(response.data)) {
        return response.data.map((category) => category.name); // Extract only category names
      } else {
        throw new Error("Invalid categories format");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    categories: [],
    loading: false,
    error: null,
    total: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export default productSlice.reducer;
