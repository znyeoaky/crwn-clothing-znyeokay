import { createSelector } from 'reselect';

//slice
const selectCartReducer = (state) => state.cart;

// getting the actual cart items off of this slice of our state.
export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

// Which is equal to create selector, receiving select cart reducer.
export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

//where actually get the total value
export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);

/*
  key thing here is that no longer 
  are we storing cart total and cart quantity inside of our reducer.
  And through using memory selectors, 
  unless those cards change, we won't be running any extra renders.
*/