import {createReducer} from "@reduxjs/toolkit";

import {getCustomer, removeCustomer, editCustomer, deleteCustomer, setCustomer} from "./actions";

export default createReducer([], {
	[getCustomer]: (state, action) => {
		return action.payload;
	},

	[deleteCustomer]: (state, action) => {
		const cusIndex = state.findIndex((customers) => customers.id === action.payload.id);
		state.splice(cusIndex, 1);
	},
	[editCustomer]: (state, action) => {
		const cusIndex = state.findIndex((customers) => customers.id === action.payload.id);
		state[cusIndex] = action.payload;
	},
	[removeCustomer]: (state, action) => {
		return (state = []);
	},
	[setCustomer]: (state, action) => {
		return action.payload;
	},
});
