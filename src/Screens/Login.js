import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, AsyncStorage, Alert } from 'react-native'
import Axios from 'axios'
import lg from './lg.png'
import {ORIGIN_URL} from 'react-native-dotenv'
import {
  Container,
  Header,
  Button,
  View,
  Left,
  Right,
  Toast,
  Text,
  Body,
  Form,
  Item,
  Input,
  Label,
  Title,
} from 'native-base'

const Login = ({navigation}) => {
  console.log(navigation)
  const [Username, setUsername] = useState('')
  const [Password, setPassword] = useState('')

  const toastr = {
    showToast: (message, duration = 2500) => {
      Toast.show({
        text: message,
        duration,
        position: 'bottom',
        textStyle: { textAlign: 'center' },
        buttonText: 'Okay',
      });
    },
  };

  function loginFun(){
    Axios.post(`${ORIGIN_URL}/api/users/login`, {
      username: Username,
      password: Password,
    })
    .then(res => {
      console.log(res);
      AsyncStorage.setItem('keyToken', `Bearer ${res.data.token}`)
      navigation.navigate('HeaderTabs', {
        navigation: navigation
      })
    })
    .catch(err => {
      console.log(err)
      Alert.alert(
        'Login Error',
        'Wrong Username or Password',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
      // toastr.showToast("wrong username or password!")
    })
    // Axios.post('http://192.168.0.114:3333/api/users/login')
  }

  return(
    <Container>
      <Header style={ styles.styleHeader } />
      <View style={{ flex: 1, flexDirection: 'column', margin: 0, marginHorizontal: 60 }}>
        <Form>
          <Image source={lg} style={{borderRadius: 10, height: 300, width: null }}/>
          <Text style={styles.titleLogin}> Log in</Text>
          <Item style={styles.inputStyle} rounded last>
            <Input placeholder="Username" onChangeText={(text) => setUsername(text)} value={Username}/>
          </Item>
          <Item style={styles.inputStyle} rounded last>
            <Input placeholder="Password" secureTextEntry={true} onChangeText={(text) => setPassword(text)} value={Password}/>
          </Item>

          <View style={{ flex: 2, flexDirection: 'row', marginVertical: 50}}>
            <Left>
              <Button onPress={() => loginFun()} full style={ styles.buttonCustom }>
                <Text> Login </Text>
              </Button>
            </Left>

            {/*
              <Right>
              <Button full primary style={ styles.roundedButton }>
              <Text> Signup </Text>
              </Button>
              </Right>
              */}
            </View>
          </Form>
        </View>
      </Container>
    )
  }

  const styles = StyleSheet.create({
    styleHeader: {
      backgroundColor: 'white',
      shadowOpacity: 0,
      elevation: 0,
      shadowOffset: {
        width: 0,
        height: 0,
      },
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
      backgroundColor: 'rgba(255,95,162,1)',
      marginVertical: 10,
      borderRadius: 50,
      shadowColor: 'rgba(0,0,0,0.15)',
      elevation: 0,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 0,
    }
  });

  export default Login
