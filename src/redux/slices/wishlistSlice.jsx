import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], 
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const itemExists = state.items.find((i) => i.id === item.id);
      if (!itemExists) {
        state.items.push(item);
      }
    },
    removeFromWishlist: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;