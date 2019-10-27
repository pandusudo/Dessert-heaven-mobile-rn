
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import History from './Screens/History'
import Login from './Screens/Login'
import Manage from './Screens/Manage'
import Home from './Screens/Home'
import Add from './Screens/Add'
import HeaderTabs from './Screens/HeaderTabs'
import Cart from './Screens/Cart'
import Del from './Screens/Delete'
import Edit from './Screens/Edit'
import Update from './Screens/Update'

const MainNavigator = createStackNavigator({
  Login,
  Home,
  Update,
  HeaderTabs,
  Cart,
  Edit,
  History,
  Manage,
  Add,
  Del
}, {
  headerMode: 'none',
  initialRouteName: 'Login'
})

export default createAppContainer(MainNavigator)
