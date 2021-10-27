import {configureStore} from "@reduxjs/toolkit";
import itesmsReducers from "./Item/reducer";
import customersReducers from "./Customer/reducer";

export default configureStore({
	reducer: {
		items: itesmsReducers,
		customers: customersReducers,
	},
});
