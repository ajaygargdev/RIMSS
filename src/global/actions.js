import { ACTION_ADD, ACTION_DELETE, ACTION_REMOVE, ACTION_RESET_CART, ACTION_SEARCH_TEXT, ACTION_SET_CHECKOUT } from "./action.type";

export const actionAddItem = payload => ({ payload, type: ACTION_ADD });
export const actionRemoveItem = payload => ({ payload, type: ACTION_REMOVE });
export const actionDeleteItem = payload => ({ payload, type: ACTION_DELETE });
export const actionSetCheckout = payload => ({ payload, type: ACTION_SET_CHECKOUT });
export const actionResetCart = payload => ({ payload, type: ACTION_RESET_CART });
export const actionSearchText = payload => ({ payload, type: ACTION_SEARCH_TEXT });