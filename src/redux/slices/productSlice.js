import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../helpers/axios";

export const saveProduct = createAsyncThunk(
  "product/saveProduct",
  async ({ product, productId }, { rejectWithValue, dispatch }) => {
    try {
      const method = productId ? "put" : "post";
      const endpoint = productId ? `/products/${productId}` : "/products";

      const { data } = await axiosInstance[method](endpoint, { product });
      dispatch(fetchHomePageProducts());
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("error");
    }
  }
);

export const fetchHomePageProducts = createAsyncThunk(
  "product/fetchHomePageProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/products");
      return data;
    } catch (error) {
      return rejectWithValue("Error fetching product");
    }
  }
);

export const fetchCategoryProduct = createAsyncThunk(
  "product/fetchCategoryProducts",
  async ({ category, queryUrl }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/products/categories/${category}${queryUrl}`
      );
      return data;
    } catch (error) {
      return rejectWithValue("Error fetching categori products");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ id }, { dispatch, rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      dispatch(fetchHomePageProducts());
    } catch (error) {
      return rejectWithValue("Error deleting product");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    error: null,
    homePageProducts: [],
    selectedProduct: null,
    productCategories: [],
    categoryProducts: [],
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(saveProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveProduct.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(saveProduct.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(fetchHomePageProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchHomePageProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.homePageProducts = action.payload.products;
      state.productCategories = action.payload.categories;
    });
    builder.addCase(fetchHomePageProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(fetchCategoryProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchCategoryProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryProducts = action.payload.products;
    });

    builder.addCase(fetchCategoryProduct.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

export const productReducer = productSlice.reducer;
export const { setSelectedProduct } = productSlice.actions;
