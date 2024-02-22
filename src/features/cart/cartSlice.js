import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  // cart: [
  //   {
  //     pizzaId: 12,
  //     name: 'Mediteranean',
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //   },
  // ],
};
const cartSlice = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter(
        (item) => item.pizzaId !== action.payload
      );
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find(
        (item) => item.pizzaId === action.payload
      );
      item.quantity++;
      item.totalPrice =
        item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // In JavaScript, objects and arrays are passed by reference, but primitive values (like numbers and strings) are passed by value. Since item in your code is an object (an element of the state.cart array), it is a reference to that object.
      const item = state.cart.find(
        (item) => item.pizzaId === action.payload
      );
      item.quantity--;
      item.totalPrice =
        item.quantity * item.unitPrice;
      //calling reducers of slice manually
      if (item.quantity === 0)
        cartSlice.caseReducers.deleteItem(
          state,
          action
        );
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});
export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// redux selector function
//recommended to start with get
export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

//function which returns a function
export const getCurrentQuantityById =
  (id) => (state) => {
    return (
      state.cart.cart.find(
        (item) => item.pizzaId === id
      )?.quantity ?? 0
    );
  };

// reselect
