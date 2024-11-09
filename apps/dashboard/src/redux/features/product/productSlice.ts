import { TProduct } from '@/types/componentType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type ProductState = {
  product: TProduct | null;
};

const initialState: ProductState = {
  product: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct(state, action: PayloadAction<TProduct>) {
      state.product = action.payload;
    },
    
    clearProduct(state) {
      state.product = null;
    },
  },
});

export const {
  setProduct,
  clearProduct,
} = productSlice.actions;

export default productSlice.reducer;
