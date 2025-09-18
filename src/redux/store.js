import { configureStore } from "@reduxjs/toolkit";
import pricingReducer from "./slices/pricingSlice";
import wishlistReducer from "./slices/wishlistSlice"; 

const store = configureStore({
    reducer: {
        pricing: pricingReducer,
        wishlist: wishlistReducer, 
    },
});

export default store;