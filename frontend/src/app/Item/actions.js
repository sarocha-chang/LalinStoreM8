import {createAction} from "@reduxjs/toolkit";

export const fetchItem = createAction("FETCH_ITEM");
export const editItem = createAction("EDIT_ITEM");
export const addItem = createAction("ADD_ITEM");
export const searchItem = createAction("SEARCH_ITEM");
export const deleteItem = createAction("DELETE_ITEM");