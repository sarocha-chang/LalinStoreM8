import {createReducer} from "@reduxjs/toolkit";

import {fetchItem, editItem, deleteItem, searchItem, addItem} from "./actions";

export default createReducer([], {
	[fetchItem]: (state, action) => {
		return action.payload;
	},
	[addItem]: (state, action) => {
		state.push(action.payload);
	},
	[editItem]: (state, action) => {
		const itemIndex = state.findIndex((items) => items.id === action.payload.id);
		state[itemIndex] = action.payload;
	},
	[deleteItem]: (state, action) => {
		const itemIndex = state.findIndex((items) => items.id === action.payload.id);
		state.splice(itemIndex, 1);
	},
	[searchItem]: (state, action) => {
		const id = action.payload;
		return state.filter((items) => {
			return items.id === id;
		});
	},
});
