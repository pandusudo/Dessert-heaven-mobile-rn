import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Axios from 'axios'
import ImagePicker from 'react-native-image-picker'
import { categories } from '../Redux/Actions/Categories'
import {ORIGIN_URL} from 'react-native-dotenv'
import {StyleSheet, Picker, AsyncStorage} from 'react-native'
import {
  Container,
  Header,
  Button,
  View,
  Left,
  Textarea,
  Right,
  Toast,
  Text,
  Body,
  Form,
  Icon,
  Item,
  Input,
  Label,
  Title,
} from 'native-base'

const Add = ({navigation}) => {
  const [Product, setProduct] = useState('')
  const [Price, setPrice] = useState('')
  const [Description, setDescription] = useState('')
  const [Quantity, setQuantity] = useState('')
  const [Category, setCategory] = useState('')
  const [Photo, setPhoto] = useState('')
  // const data = new FormData();

  const priceInt = parseInt(Price)
  const quantityInt = parseInt(Quantity)

  const [Cat, setCategories] = useState([])
  const Categories = useSelector(state => state.categories.categories)
  const dispatch = useDispatch()

  async function getCategories() {
    const resp = await dispatch(categories())
    setCategories(resp.value.data.data)
  }

  useEffect(() => {
    getCategories()
  }, [])

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        setPhoto(response)
        console.log(response.uri)
      }
    })
  }

  const createFormData = (photo, body) => {
    const data = new FormData();

    data.append("image", {
      name: photo.fileName,
      type: photo.type,
      uri:
      Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };

  async function submitProduct(){
    Axios.post(`${ORIGIN_URL}/api/products`, createFormData(Photo, { id_category: Category, name: Product, description: Description, price: priceInt, count: quantityInt}), {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': await AsyncStorage.getItem('keyToken')
      }
    })
    .then(res => {
      console.log(res)
      navigation.navigate('HeaderTabs')
    })
    .catch(err => {
      console.log(err)
    })
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
          <Title></Title>
        </Body>
        <Right>
        </Right>
      </Header>
      <View style={{ flex: 1, flexDirection: 'column', marginVertical: 30, marginHorizontal: 60 }}>
        <Form>
          <Text style={styles.titleLogin}> Add Product</Text>
          <Item style={styles.inputStyle} rounded last>
            <Input placeholder="Name Product" onChangeText = {(text) => setProduct(text)}/>
          </Item>
          <Item style={styles.inputStyle} rounded last>
            <Input placeholder="Price" keyboardType={'numeric'} onChangeText = {(text) => setPrice(text)}/>
          </Item>
          <Item style={styles.inputStyle} rounded last>
            <Input placeholder="Quantity" keyboardType={'numeric'} onChangeText = {(text) => setQuantity(text)}/>
          </Item>
          <Item style={styles.inputStyle} rounded last>
            <Picker
              style={{height: 50, width: '100%'}}
              selectedValue={Category}
              onValueChange={(value) => setCategory(value)}
              >
              {
                Categories.map(item => {
                  return(
                    <Picker.Item label={item.name_category} value={item.id} />
                  )
                })
              }
            </Picker>
          </Item>
          <Item style={styles.inputStyle} rounded last>
            <Button style={styles.uploadPhoto} title="Choose Photo" onPress={() => handleChoosePhoto()} >
              <Text style={{color: 'black'}}>
                Upload Photo
              </Text>
            </Button>
          </Item>
          <Item style={styles.inputStyle} rounded last>
            <Textarea rowSpan={5} placeholder="Description" onChangeText = {(text) => setDescription(text)}/>
          </Item>
          <View style={{ flex: 2, flexDirection: 'row', marginVertical: 50}}>
            <Left>
              <Button full style={ styles.buttonCustom } onPress={() => submitProduct()}>
                <Text> Submit </Text>
              </Button>
            </Left>
          </View>
        </Form>
      </View>
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

export default Add
