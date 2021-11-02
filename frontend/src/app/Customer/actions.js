import {createAction} from "@reduxjs/toolkit";

export const getCustomer = createAction("GET_CUSTOMER");
export const deleteCustomer = createAction("DELETE_CUSTOMER");
export const editCustomer = createAction("EDIT_CATEGORY");
export const removeCustomer = createAction("REMOVE_CUSTOMER");
export const setCustomer = createAction("SET_CUSTOMER");
