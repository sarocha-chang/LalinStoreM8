import {configureStore} from "@reduxjs/toolkit";
import itemsReducers from "./Item/reducer";
import customersReducers from "./Customer/reducer";
import categoryReducers from "./Category/reducer";
export default configureStore({
	reducer: {
		items: itemsReducers,
		category: categoryReducers,
		customers: customersReducers,
	},
});
