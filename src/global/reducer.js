import { ACTION_ADD, ACTION_DELETE, ACTION_REMOVE, ACTION_RESET_CART, ACTION_SEARCH_TEXT, ACTION_SET_CHECKOUT } from "./action.type";

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_ADD:
      const addIdx = state.cart.findIndex(item => item.id === action.payload.id);
      const addCart = [...state.cart];
      if (addIdx === -1) {
        addCart.push({ ...action.payload, qty: 1 });
      }
      else {
        const addQty = state.cart[addIdx].qty + 1;
        addCart.splice(addIdx, 1, { ...action.payload, qty: addQty });
      }
      return {
        ...state,
        cart: addCart
      }
    case ACTION_REMOVE:
      const removeIdx = state.cart.findIndex(item => item.id === action.payload.id);
      const removeCart = [...state.cart];
      if (removeIdx > -1) {
        const removeQty = state.cart[removeIdx].qty - 1;
        if (removeQty > 0) {
          removeCart.splice(removeIdx, 1, { ...action.payload, qty: removeQty });
        }
        else {
          removeCart.splice(removeIdx, 1);
        }
      }
      return {
        ...state,
        cart: removeCart
      }
    case ACTION_DELETE:
      const deleteIdx = state.cart.findIndex(item => item.id === action.payload.id);
      const deleteCart = [...state.cart];
      deleteCart.splice(deleteIdx, 1);
      return {
        ...state,
        cart: deleteCart
      }
    case ACTION_SET_CHECKOUT:
      return {
        ...state,
        checkoutId: action.payload
      }
    case ACTION_RESET_CART:
      return {
        ...state,
        cart: []
      }
      case ACTION_SEARCH_TEXT:
        return {
          ...state,
          searchText: action.payload
        }
    default:
      return state;
  }
};