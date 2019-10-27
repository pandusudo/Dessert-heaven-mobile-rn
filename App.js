import React from 'react'
import {Provider} from 'react-redux'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native'
import store from './src/Redux/Store'

import MainNavigation from './src/Navigator'

const App = () => {
  return(
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  )
}

export default App
