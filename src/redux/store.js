import { configureStore } from "@reduxjs/toolkit";
import pricingReducer from "./slices/pricingSlice";
import wishlistReducer from "./slices/wishlistSlice"; 
import themeReducer from "./slices/themeSlice";
const store = configureStore({
    reducer: {
        pricing: pricingReducer,
        wishlist: wishlistReducer, 
         theme: themeReducer,
    },
});

export default store;