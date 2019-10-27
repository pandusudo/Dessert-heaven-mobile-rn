import { combineReducers } from 'redux'

import home from './Home'
import cart from './Cart'
import categories from './Categories'

const rootReducer = combineReducers({
  home,
  cart,
  categories
})

export default rootReducer
