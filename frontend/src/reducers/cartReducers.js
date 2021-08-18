import {CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload; // data from user

      // @ check the item already has in the array
      // @ if has assign to existItem
      const existItem = state.cartItems.find(x => x.product === item.product) 

      if (existItem) {
        // @ if exist then
        // @ check which one exist and put it
        // @ otherwise as it is
        return {
          ...state,
          cartItems: [...state.cartItems.map(x => x.product === existItem.product ? item : x)]
        }

      } else {
        // @ if not exist then
        // @ just add the item in array
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }
  
    case CART_REMOVE_ITEM:
      return{
        ...state,
        cartItems: state.cartItems.filter(x => x.product !== action.payload)
      }
      
    default:
      return state;
  }
}