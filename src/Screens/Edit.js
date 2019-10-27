import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {StyleSheet, Image, Alert, AsyncStorage} from 'react-native'
import { home } from '../Redux/Actions/Home'
import Axios from 'axios'
import {ORIGIN_URL} from 'react-native-dotenv'
import { View, Text, Header, Card, CardItem, Title, Button, Container, Left, Right, Body, Icon, Content } from 'native-base'

const Edit = ({navigation}) => {
  const [Data, setData] = useState([])
  const Home = useSelector(state => state.home.home)
  const dispatch = useDispatch()

  async function getData() {
    const resp = await dispatch(home())
    setData(resp.value.data.data)
  }

  useEffect(() => {
    getData()
  }, [])

  const EditProduct = props => {
    return(
      <Card style={{width: 455}}>
        <CardItem cardBody style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
          <View style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5, flex: 1, flexWrap: 'wrap', flexDirection: 'row' }} >
            <View>
              <Image source={{uri: props.image}} style={{borderRadius: 5, height: 200, width: 200,  }}/>
            </View>
            <View style={{borderRadius: 5, height: 200, width: 250, padding: 20}}>
              <Text>{props.name}</Text>
              <Text>$ {props.price}</Text>
              <Text>{props.desc}</Text>
            </View>
          </View>
        </CardItem>
        <CardItem footer style={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
          <Body style={{padding: 10}}>
            <Button rounded success onPress = {() => navigation.navigate('Update', {
                name: props.name,
                price: props.price,
                desc: props.desc,
                qty: props.qty,
                id: props.id,
                category: props.category
              })
            }>
            <Text> Edit This Product</Text>
          </Button>
        </Body>
      </CardItem>
    </Card>
  )
}

return(
  <Container>
    <Header style={styles.styleHeader}>
      <Left>
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon name='arrow-back' />
        </Button>
      </Left>
      <Body>
        <Title>Update Product</Title>
      </Body>
      <Right>
      </Right>
    </Header>
    <Content>
      <View style={{padding: 10, justifyContent: 'center', flex: 1, flexWrap: 'wrap', flexDirection:'row'}}>
        {
          Data.map(item => {
            return(
              <EditProduct name={item.name} category={item.id_category} image={`${ORIGIN_URL}/`+item.image} price={item.price} id={item.id} desc={item.description} qty={item.count} />
            )
          })
        }
      </View>
    </Content>
  </Container>
)
}

const styles = StyleSheet.create({
  styleHeader: {
    backgroundColor: '#5920ff',
    borderWidth: 0,
  },
  titleLogin: {
    textAlign: 'center',
    fontSize: 30,
    marginVertical: 20,
  },
  inputStyle: {
    marginVertical: 10
  },
  buttonCustom: {
    backgroundColor: '#5920ff',
    marginVertical: 10,
    borderRadius: 50,
    shadowColor: 'rgba(0,0,0,0.15)',
    elevation: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 0,
  },
  uploadPhoto: {
    backgroundColor: 'white',
    elevation: 0,
    color: 'red'
  }
});

export default Edit
