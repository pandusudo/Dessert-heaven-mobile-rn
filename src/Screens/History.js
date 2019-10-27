import React, { useState, useEffect } from 'react'
import { Grid, Row, StyleSheet, Image, Dimensions } from 'react-native'
import {ORIGIN_URL} from 'react-native-dotenv'
import axios from 'axios'
import {
  Container,
  Header,
  Button,
  Card,
  CardItem,
  Content,
  View,
  Left,
  Right,
  Text,
  Body,
  Form,
  Item,
  Input,
  Label,
  Title,
} from 'native-base'

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit"

const screenWidth = Math.round(Dimensions.get('window').width)

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [{
    data: [ 20, 45, 28, 80, 99, 43 ],
  }]
}

const chartConfig = {
  backgroundColor: 'blue',
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'green',
  color: (opacity = 1) => `rgba(0, 151, 230, ${opacity})`,
  style: {
    borderRadius: 16
  }
}


const Chart = ({navigation}) => {
  const [Daily, setDaily] = useState([])
  const [Annual, setAnnual] = useState([])

  const getDailyIncome = () => {
    axios.get(`${ORIGIN_URL}/api/products/dailyIncome`)
    .then(result => {
      this.setDaily(result.data.data)
      console.log(result.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const getAnnualIncome = () => {
    axios.get(`${ORIGIN_URL}/api/products/annualIncome`)
    .then(result => {
      this.setAnnual(result.data.data)
      console.log(result.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getDailyIncome()
  }, [])

  var dailyIncome = [0]
  var dailyOrders = [0]
  Daily.map(item => {
    dailyIncome.push(item.INCOME)
    dailyOrders.push(item.AMOUNT)
  })

  var annualIncome = [0]
  Annual.map(item => {
    annualIncome.push(item.INCOME)
  })

  return(
    <Container>
      <Content>
        <View style={{padding: 20}}>
          <Text style={{fontSize: 30}}>Chart</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'column', padding: 10, margin: 0 }}>
          <Card style={styles.customCard}>
            <CardItem style={{justifyContent:'center'}}>
              <LineChart
                data={data}
                width={430}
                height={256}
                verticalLabelRotation={30}
                chartConfig={chartConfig}
                bezier
                />
            </CardItem>
          </Card>
        </View>
        <View style={{padding: 10}}>
          <Card style={styles.customCard}>
            <CardItem header style={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
              <Text>Today's Income</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  $ {dailyIncome[dailyIncome.length - 1]}
                </Text>
              </Body>
            </CardItem>
            <CardItem footer style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
              <Text></Text>
            </CardItem>
          </Card>
        </View>
        <View style={{flex:1, justifyContent: 'center', flexWrap:'wrap', flexDirection:'row'}}>
          <Card style={styles.customCardCouple}>
            <CardItem header style={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
              <Text>Today's Order</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {dailyOrders[dailyOrders.length - 1]}
                </Text>
              </Body>
            </CardItem>
            <CardItem footer style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
              <Text></Text>
            </CardItem>
          </Card>
          <Card style={styles.customCardCouple}>
            <CardItem header style={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
              <Text>This Year's Income</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {annualIncome[annualIncome.length - 1]}
                </Text>
              </Body>
            </CardItem>
            <CardItem footer style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
              <Text></Text>
            </CardItem>
          </Card>
        </View>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  customCard: {
    borderRadius: 8,
    elevation: 10,
  },
  customCardCouple: {
    borderRadius: 10,
    elevation: 5,
    width: 225,
  },
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

export default Chart
