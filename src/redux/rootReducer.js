/** @format */

const initialState = {
 loading: false,
 cartItems: [],
};

export const rootReducer = (state = initialState, action) => {
 switch (action.type) {
  case "addtoCart":
   return {
    ...state,
    cartItems: [...state.cartItems, action.payload],
   };
  default:
   return state;
 }
};
