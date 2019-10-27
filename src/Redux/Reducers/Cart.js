const initialState = {
  cart: [],
  isLoading: false,
  isFullfilled: false,
  isRejected: false
}

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CART_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFullfilled: false
      }
      break;

    case 'ADD_CART_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }
      break;

    case 'ADD_CART_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        cart: action.data
      }
      break;

    default:
      return state
      break;

  }
}

export default cart
