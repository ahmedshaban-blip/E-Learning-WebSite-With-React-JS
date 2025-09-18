import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    planType: "monthly",
    prices: {
        free: 0,
        pro: 79,
    },
};

const pricingSlice = createSlice({
    name: "pricing",
    initialState,
    reducers: {
        togglePlan: (state, action) => {
            state.planType = action.payload;

            if (action.payload === "monthly") {
                state.prices.pro = 79;
            } else if (action.payload === "yearly") {
                state.prices.pro = 800;
            }
        },
    },
});

export const { togglePlan } = pricingSlice.actions;
export default pricingSlice.reducer;
