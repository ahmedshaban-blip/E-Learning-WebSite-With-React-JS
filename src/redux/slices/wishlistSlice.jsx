import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [], // array of courseId
};

export const wishlistSlice = createSlice({
	name: "wishlist",
	initialState,
	reducers: {
		addToWishlist: (state, action) => {
			const id = action.payload;
			if (!state.items.includes(id)) {
				state.items.push(id);
			}
		},
		removeFromWishlist: (state, action) => {
			const id = action.payload; //  courseId
			state.items = state.items.filter((x) => x !== id);
		},
		// load from Firestore
		setFavorites: (state, action) => {
			state.items = action.payload || [];
		},
	},
});

export const { addToWishlist, removeFromWishlist, setFavorites } =
	wishlistSlice.actions;
export default wishlistSlice.reducer;
