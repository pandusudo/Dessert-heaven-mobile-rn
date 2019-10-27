import axios from 'axios'
import {AsyncStorage} from 'react-native'
import {ORIGIN_URL} from 'react-native-dotenv'

export const home = () => {
  return {
    type: 'GET_HOME',
    payload: new Promise(async (resolve, reject) => {
      axios.get(`${ORIGIN_URL}/api/products`,{
        headers: {
          Authorization: await AsyncStorage.getItem('keyToken')
        }
      })
      .then(result => resolve(result))
      .catch(err => reject(err))
    })
  }
}
