import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet } from 'react-native'
import {
  Container,
  Header,
  Tab,
  Icon,
  Item,
  Input,
  Left,
  TabHeading,
  Right,
  Tabs,
  Text,
  Button
} from 'native-base'


import Tab1 from './Home'
import Tab2 from './History'
import Tab3 from './Manage'


const HeaderTabs = ({navigation}) => {
  const [Search, setSearch] = useState('')
  const Home = useSelector(state => state.home.home)
  const dispatch = useDispatch()



  console.log("HELOO"+navigation)
  return(
    <Container>
      <Header hasTabs searchBar style={styles.customHeader}>
          <Item rounded style={{marginLeft: 0}}>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={(text) => setSearch(text)} value={Search} />
          </Item>
      </Header>
      <Tabs style={styles.customTabs}>
        <Tab heading={ <TabHeading style={{backgroundColor: '#5920ff'}}><Icon name="home" /></TabHeading>}>
          <Tab1 navigate={navigation}/>
        </Tab>
        <Tab heading={ <TabHeading style={{backgroundColor: '#5920ff'}}><Icon type="FontAwesome" name="line-chart" /></TabHeading>}>
          <Tab2 />
        </Tab>
        <Tab heading={ <TabHeading style={{backgroundColor: '#5920ff'}}><Icon type="AntDesign" name="setting" /></TabHeading>}>
          <Tab3 navigate={navigation} />
        </Tab>
      </Tabs>
    </Container>
  )
}

const styles = StyleSheet.create({
  customButton: {
    shadowOpacity: 0,
    elevation: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  customHeader: {
    backgroundColor: '#5920ff',
    borderWidth: 0,
  },
  customTabs: {
    borderWidth: 0,
    elevation: 0,
  }
})

export default HeaderTabs
