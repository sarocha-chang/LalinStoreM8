import {createAction} from "@reduxjs/toolkit";

export const fetchCategory = createAction("FETCH_CATEGORY");
export const editCategory = createAction("EDIT_CATEGORY");
export const addCategory = createAction("ADD_CATEGORY");
export const searchCategory= createAction("SEARCH_CATEGORY");
export const deleteCategory = createAction("DELETE_CATEGORY");