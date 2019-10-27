import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { home } from '../Redux/Actions/Home'
import { cart } from '../Redux/Actions/Cart'
import { Col, Row, Grid } from "react-native-easy-grid"
import Axios from 'axios'
import { Container, Header, Content, Fab, Tabs, Tab, TabHeading, Footer, Thumbnail, Body, Card, CardItem, Left, Right, FooterTab, Button, Icon, Text } from 'native-base'
import { View, Image, AsyncStorage, StyleSheet } from 'react-native'
import {ORIGIN_URL} from 'react-native-dotenv'
import Tab1 from './Login'
import Tab2 from './History'

const Home = props => {
  const [Data, setData] = useState([])
  const Home = useSelector(state => state.home.home)
  const dispatch = useDispatch()

  async function getData() {
    // const res = await fetch('http://192.168.1.7:3333/api/products')
    // const resp = await Axios.get('http://192.168.0.114:3333/api/products')
    // setData(resp.data.data)
    // console.log(resp)

    const resp = await dispatch(home())
    setData(resp.value.data.data)
    let token = await AsyncStorage.getItem('keyToken')
    console.log(resp.value.data.data)
  }

  useEffect(() => {
    getData()
  }, [])

  return(
    <>
    <Container>
      <Content style={{flex: 1, flexDirection: 'column', margin: 10, flexWrap: 'wrap'}}>
        {/*<Grid>
          <Row style={{padding: 30}}>
          <Col>*/}
          <View style={{marginLeft: 0}}>
            <View style={styles.Body}>
            {
              Data.map(item => {
                return(
                  <CardProduct
                    name={item.name}
                    id={item.id}
                    qty={item.count}
                    image={`${ORIGIN_URL}/`+item.image}
                    price={item.price}
                    />
                )
              })
            }
            </View>
          {/*
          </Col>
          </Row>
          </Grid>*/}
        </View>
      </Content>

      <Fab
            active={true}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => props.navigate.navigate('Cart')}
            >
            <Icon name="cart"/>
      </Fab>

      {/*<Footer >
        <FooterTab style={styles.customFooter}>
        <Button active vertical style={styles.customFooter}>
        <Icon type="FontAwesome" name="history" />
        </Button>
        <Button active vertical style={styles.customFooter}>
        <Icon active type="FontAwesome" name="home" />
        </Button>
        <Button active vertical style={styles.customFooter}>
        <Icon type="FontAwesome" name="line-chart" />
        </Button>
        </FooterTab>
        </Footer> */}
      </Container>
      </>
  )
}

const CardProduct = props => {
  return(
    <Card style={styles.customCard}>
      <CardItem cardBody style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
        <Image source={{uri: props.image}} style={{borderRadius: 5, height: 300, width: '100%', flex: 1, }}/>
      </CardItem>
      <CardItem>
        <Text>{props.name}</Text>
      </CardItem>
      <CardItem>
        <Text>$ {props.price}</Text>
      </CardItem>
      <CardItem footer style={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
        <Body>
          <Button onPress={() => addCart(props.name, props.price, props.image, props.id)} rounded style={{backgroundColor: '#5920ff'}}>
            <Text> Add to Cart</Text>
          </Button>
        </Body>
      </CardItem>
    </Card>
  )
}

const addCart = (name, price, image, id) => {

}

const styles = StyleSheet.create({
  customFooter: {
    backgroundColor: 'rgba(255,95,162,1)',
  },
  styleHeader: {
    opacity: 100,
    backgroundColor: 'white',
    shadowOpacity: 0,
    elevation: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  Body: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  customCard: {
    width: 200,
    marginLeft: 20,
    borderRadius: 10,
    backgroundColor: "white",
    shadowOpacity: 0,
    elevation: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  }
})

export default Home
