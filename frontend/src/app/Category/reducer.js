import {createReducer} from "@reduxjs/toolkit";

import {fetchCategory,editCategory,deleteCategory,searchCategory, addCategory} from "./actions";

export default createReducer([], {
	[fetchCategory]: (state, action) => {
		return action.payload;
	},
	[addCategory]: (state, action) => {
		return action.payload;
	},
	[editCategory]: (state, action) => {
		const itemIndex = state.findIndex((items) => items.id === action.payload.id);
		state[itemIndex] = action.payload;
	},
	[deleteCategory]: (state, action) => {
		const itemIndex = state.findIndex((items) => items.id === action.payload.id);
		state.splice(itemIndex, 1);
	},
	[searchCategory]: (state, action) => {
		const id = action.payload;
		return state.filter((items) => {
			return items.id === id;
		});
	},
});
