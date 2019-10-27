import React from 'react'
import { StyleSheet, Image, AsyncStorage } from 'react-native'
import { Container, Header, View, Content, ListItem, Switch, Fab, Tabs, Tab, TabHeading, Footer, Thumbnail, Body, Card, CardItem, Left, Right, FooterTab, Button, Icon, Text } from 'native-base'

const Manage = props => {

  return(
    <Container>
      <Content>
        <View style={{marginVertical: 20}}>
          <ListItem itemDivider>
            <Text>Manipulate Data</Text>
          </ListItem>
          <ListItem icon onPress={() => props.navigate.navigate('Add')}>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active type="AntDesign" name="plus" />
              </Button>
            </Left>
            <Body>
              <Text>Add Product</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
          <ListItem icon onPress={() => props.navigate.navigate('Del')}>
            <Left>
              <Button style={{ backgroundColor: "#ffc342" }}>
                <Icon active name="trash" />
              </Button>
            </Left>
            <Body>
              <Text>Delete Product</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
          <ListItem icon onPress={() => props.navigate.navigate('Edit')}>
            <Left>
              <Button style={{ backgroundColor: "#8bff42" }}>
                <Icon active type="Feather" name="edit" />
              </Button>
            </Left>
            <Body>
              <Text>Edit Data</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
        </View>
      </Content>
    </Container>
  )
}

export default Manage
