import { TOrderItem } from '@/types/componentType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type OrderState = {
  order: TOrderItem | null;
};

const initialState: OrderState = {
  order: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<TOrderItem>) {
      state.order = action.payload;
    },
    
    clearOrder(state) {
      state.order = null;
    },
  },
});

export const {
  setOrder,
  clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
