import { createReducer } from "@reduxjs/toolkit";

import {
	fetchItem,
	detailItem,
} from "./actions";

export default createReducer([], {
	[fetchItem]: (state, action) => {
		return action.payload;
	},
	[detailItem]: (state, action) =>{
		return state.payload
	}
});
