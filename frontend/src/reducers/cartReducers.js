import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      //collect the payload from cartActions.js
      const item = action.payload;
      //check if item exist in cart, compare current item with products in cart
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case CART_REMOVE_ITEM:
      //filters the item that should be removed
      //if the id equals to productId that comes from the payload, it filters that product
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product != action.payload),
      };
    default:
      return state;
  }
};
