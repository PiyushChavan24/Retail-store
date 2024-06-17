/** @format */

// Define action type constants
const ADD_TO_CART = "ADD_TO_CART";
const DELETE_FROM_CART = "DELETE_FROM_CART";
const UPDATE_CART = "UPDATE_CART";
const SHOW_LOADING = "SHOW_LOADING";
const HIDE_LOADING = "HIDE_LOADING";

// Initial state
const initialState = {
 loading: false,
 cartItems: [],
};

// Root reducer
export const rootReducer = (state = initialState, action) => {
 switch (action.type) {
  case ADD_TO_CART:
   return {
    ...state,
    cartItems: [...state.cartItems, action.payload],
   };
  case DELETE_FROM_CART:
   return {
    ...state,
    cartItems: state.cartItems.filter(
     (item) => item._id !== action.payload._id
    ),
   };
  case UPDATE_CART:
   return {
    ...state,
    cartItems: state.cartItems.map((item) =>
     item._id === action.payload._id
      ? { ...item, quantity: action.payload.quantity }
      : item
    ),
   };
  case SHOW_LOADING:
   return {
    ...state,
    loading: true,
   };
  case HIDE_LOADING:
   return {
    ...state,
    loading: false,
   };
  default:
   return state;
 }
};

// Action creators (optional, for better readability and usage in components)
export const addToCart = (item) => ({ type: ADD_TO_CART, payload: item });
export const deleteFromCart = (item) => ({
 type: DELETE_FROM_CART,
 payload: item,
});
export const updateCart = (item) => ({ type: UPDATE_CART, payload: item });
export const showLoading = () => ({ type: SHOW_LOADING });
export const hideLoading = () => ({ type: HIDE_LOADING });
