import axios from 'axios'
import {AsyncStorage} from 'react-native'

export const cart = () => {
  return {
    type: 'ADD_CART'
  }
}
