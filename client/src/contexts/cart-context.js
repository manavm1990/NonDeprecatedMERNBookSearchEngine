import { createContext } from "react";

export const cartReducer = (state, action) => {
  switch (action.type) {
    // This covers increasing the quantity of an item in the cart
    case "ADD_TO_CART": {
      const { cart } = state;

      // Does this item already exist in the cart?
      const existingCartItem = cart.find(
        (item) => item.id === action.payload.id
      );

      return {
        ...state,
        cart: [
          ...cart,
          {
            ...action.payload,
            quantity: existingCartItem ? existingCartItem.quantity + 1 : 1,
          },
        ],
      };
    }

    // This covers decreasing the quantity of an item in the cart
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 || 0 }
            : item
        ),
      };
  }
};

export default createContext(null);
