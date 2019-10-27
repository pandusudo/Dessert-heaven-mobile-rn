const initialState = {
  home: [],
  isLoading: false,
  isFullfilled: false,
  isRejected: false
}

const home = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_HOME_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFullfilled: false
      }
      break;

    case 'GET_HOME_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }
      break;

    case 'GET_HOME_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        categories: action.payload.data.data
      }
      break;

    default:
      return state
      break;

  }
}

export default home
