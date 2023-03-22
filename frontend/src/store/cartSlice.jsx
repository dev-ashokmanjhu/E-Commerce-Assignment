import { createSlice } from "@reduxjs/toolkit";
const defaultState = { items: [], totalAmount: 0, cartIsValid: true };
const cartSlice = createSlice({
  name: "cart",
  initialState: defaultState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const numberOfitems = state.items.reduce((curNumber, item) => {
        return curNumber + item.quantity;
      }, 0);

      if (numberOfitems + newItem.quantity > 20) {
        return {
          items: state.items,
          totalAmount: state.totalAmount,
          cartIsValid: false,
        };
      }
      // checking item already exist or not in the cart behalf of it add item in cart
      const existingCartItmeIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );
      const existingitem = state.items[existingCartItmeIndex];
      // make variable for not direct mutate the state
      let updatedItems;
      // conditionaly adding items to the cart
      if (existingitem) {
        // overriding only quantity state of cart item
        const updatedItem = {
          ...existingitem,
          quantity: existingitem.quantity + newItem.quantity,
        };
        // getting a copy of current state
        updatedItems = [...state.items];
        // changing current item state
        updatedItems[existingCartItmeIndex] = updatedItem;
      } else {
        // adding item to the item state with concat methods without mutating the state
        updatedItems = state.items.concat(newItem);
      }
      // updating the total amount however it exist or not in cart
      const updatedTotalAmount =
        state.totalAmount + newItem.price * newItem.quantity;
      // return updated state
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        cartIsValid: true,
      };
    },
    updateCartItem(state, action) {
      const newItem = action.payload;
      const numberOfCartItems = state.items.reduce((curNumber, item) => {
        return curNumber + item.quantity;
      }, 0);

      // checking item already exist or not in the cart behalf of it add item in cart
      const existingCartItmeIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );
      const existingCartItem = state.items[existingCartItmeIndex];
      // checking cart limit reached after updating total cart limit
      let totalCartItems = numberOfCartItems;
      if (existingCartItem) {
        totalCartItems = numberOfCartItems - existingCartItem.quantity;
      }
      if (totalCartItems + newItem.quantity > 20) {
        return {
          items: state.items,
          totalAmount: state.totalAmount,
          cartIsValid: false,
        };
      }
      // make variable for not direct mutate the state
      let updatedItems;
      // conditionaly adding items to the cart
      if (existingCartItem) {
        // overriding only quantity state of cart item
        const updatedItem = {
          ...existingCartItem,
          quantity: newItem.quantity,
        };
        // getting a copy of current state
        updatedItems = [...state.items];
        // changing current item state
        updatedItems[existingCartItmeIndex] = updatedItem;
      } else {
        // adding item to the item state with concat methods without mutating the state
        updatedItems = state.items.concat(newItem);
      }
      // updating the total amount however it exist or not in cart
      let totAmount = state.totalAmount;
      if (existingCartItem) {
        totAmount =
          state.totalAmount -
          existingCartItem.price * existingCartItem.quantity;
      }
      const updatedTotalAmount = totAmount + newItem.price * newItem.quantity;
      // return updated state
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        cartIsValid: true,
      };
    },
    removeCartItem(state, action) {
      const id = action.payload;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === id
      );
      const existingItem = state.items[existingCartItemIndex];
      // updating the total amount however it exist or not in cart
      state.totalAmount =
        state.totalAmount - existingItem.price * existingItem.quantity;
      state.items = state.items.filter((item) => item.id !== id);
    },
    removeFromCart(state, action) {
      const id = action.payload;
      // checking item already exist or not in the cart behalf of it add item in cart
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === id
      );
      const existingItem = state.items[existingCartItemIndex];
      // updating the total amount however it exist or not in cart
      const updatedTotalAmount = state.totalAmount - existingItem.price;

      let updatedItems;
      //remove item or decrease quantity of item based on condition
      if (existingItem.quantity === 1) {
        updatedItems = state.items.filter((item) => item.id !== id);
      } else {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
        // making copy of current state
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      // returning updated state
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        cartIsValid: true,
      };
    },
    cartReset(state) {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
