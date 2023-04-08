import { createContext } from "react";

export const cartReducer = (state, action) => {
  switch (action.type) {
    // This covers increasing the quantity of an item in the cart.
    case "ADD_BOOK": {
      // Does this item already exist in the cart?
      const existingCartItem = state.find(
        (item) => item.bookId === action.payload.bookId
      );

      // If it's an existing item, map over the cart.
      return existingCartItem
        ? state.map((item) =>
            // If it's the existing 'bookId', increase the quantity by 1.
            item.bookId === action.payload.bookId
              ? { ...item, quantity: item.quantity + 1 }
              : // Otherwise, return the item as is.
                item
          )
        : // If it's a new item, add it to the cart with a quantity of 1.
          [...state, { ...action.payload, quantity: 1 }];
    }

    // This covers decreasing the quantity of an item in the cart.
    case "REMOVE_BOOK":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity - 1 || 0 }
          : item
      );
  }
};

export default createContext(null);
