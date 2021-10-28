import {createReducer} from "@reduxjs/toolkit";

import {fetchCategory, editCategory, deleteCategory, searchCategory, addCategory} from "./actions";

export default createReducer([], {
	[fetchCategory]: (state, action) => {
		return action.payload;
	},
	[addCategory]: (state, action) => {
		state.push(action.payload);
	},
	[editCategory]: (state, action) => {
		const cateIndex = state.findIndex((categories) => categories.id === action.payload.id);
		state[cateIndex] = action.payload;
	},
	[deleteCategory]: (state, action) => {
		const cateIndex = state.findIndex((categories) => categories.id === action.payload.id);
		state.splice(cateIndex, 1);
	},
	[searchCategory]: (state, action) => {
		const id = action.payload;
		return state.filter((categories) => {
			return categories.id === id;
		});
	},
});
