import _ from 'lodash';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { Avatar, Button, Icon, ButtonGroup } from 'react-native-elements';
import { LinearGradient } from '../../components/LinearGradient';
import axios from 'axios'
var positiveC = 0;
var negetiveC = 0;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class ListsScreen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 1,
      button: 0,
      data: null,
      sum: null,
      positiveCoins: 0,
      negetiveCoins: 0,
    }
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      axios('http://192.168.0.15:4567/get/1').then((data) => {
        this.setState({ data: data.data })
        var sum = this.state.data.reduce( (a, { coins }) => {
          // alert(JSON.stringify(a))
          // alert(JSON.stringify(coins))

          +(coins.replace(/ /g, '')) > 0 ?  
          this.setState( ({positiveCoins})=>{
            this._storeData(+(coins.replace(/ /g, '')))
            return {
              positiveCoins : positiveCoins + +(coins.replace(/ /g, ''))
          }})
          : 
          this.setState( ({negetiveCoins})=>{
            this._storeData(+(coins.replace(/ /g, '')))
            return{
              negetiveCoins: negetiveCoins + +(coins.replace(/ /g, ''))
            }
          }) 
          return a + +(coins.replace(/ /g, ''))
        }, 0);
        this.setState({ sum: sum })
        return data.data
      }).catch(err => {
        alert(err)
        console.log(err)
      })
    })
  }

  componentWillUnmount() {
      // Remove the event listener before removing the screen from the stack
      this.focusListener.remove();
  }

  _storeData = async (coins) => {
    try {
      if(coins > 0){
        positiveC = positiveC + coins
        await AsyncStorage.setItem('positive', positiveC);
      } else{
        negetiveC = negetiveC + coins
        await AsyncStorage.setItem('negetive', negetiveC);
      }
    } catch (error) {
      // Error saving data
    }
  };

  renderValue(user) {
    const { coins, positive } = user;

    if (positive) {
      return (
        <View
          style={{
            backgroundColor: 'rgba(220,230,218,1)',
            width: 70,
            height: 28,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: 10,
          }}
        >
          <Image style={styles.stretch} source={require('../../images/dollar.png')} />
          <Text
            style={{
              color: 'green',
              fontFamily: 'regular',
              fontSize: 13,
              marginLeft: 5,
            }}
          >
            {coins}
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            backgroundColor: 'rgba(244,230,224,1)',
            width: 70,
            height: 28,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: 10,
          }}
        >
          <Image style={styles.stretch} source={require('../../images/dollar.png')} />
          <Text
            style={{
              color: 'red',
              fontFamily: 'regular',
              fontSize: 13,
              marginLeft: 5,
            }}
          >
            {coins}
          </Text>
        </View>
      );
    }
  }

  renderRating(user) {
    const { score, positive } = user;
    return (
      <View
        style={{
          width: 70,
          height: 28,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginLeft: 10,
        }}
      >
        <Text
          style={{
            fontFamily: 'regular',
            fontSize: 13,
            marginLeft: 5,
          }}
        >
          <Image style={styles.stretch} source={require('../../images/fico-score.png')} />
          {score}
        </Text>
      </View>
    );
  }

  renderKms(user) {
    const { totalDriven } = user;
    return (
      <View
        style={{
          backgroundColor: 'white',
          width: 60,
          height: 28,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginLeft: 10,
        }}
      >
        <Text
          style={{
            fontFamily: 'regular',
            fontSize: 13,
            marginLeft: 5,
          }}
        >
          {totalDriven}
        </Text>
      </View>
    );
  }

  renderCard(user, index) {
    const { date, avatar } = user;
    const { positiveCoins, negetiveCoins } = this.state
    return (
      <TouchableOpacity
        key={index}
        style={{
          height: 60,
          marginHorizontal: 10,
          marginTop: 10,
          backgroundColor: 'white',
          borderRadius: 5,
          alignItems: 'center',
          flexDirection: 'row',
        }}
        onPress={() => {
        this.props.navigation.navigate("TripDetail", { user: user, positiveCoins: positiveCoins, negetiveCoins: negetiveCoins})
        }}
      >
        <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: 'regular',
              fontSize: 15,
              marginLeft: 10,
              color: 'gray',
            }}
          >
            {date}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginRight: 10,
          }}
        >
          {this.renderKms(user)}
          {this.renderRating(user)}
          {this.renderValue(user)}
        </View>
      </TouchableOpacity>
    );
  }

  renderListCards(data) {
    return data && data[0] && _.map(data, (user, index) => {
      return this.renderCard(user, index);
    });
  }

  render() {
    var { data, sum } = this.state;
    return (
      <View>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,1)' }}
        >
          <View style={styles.statusBar} />
          <View style={styles.navBar}>
          </View>
          <ButtonGroup
            buttons={['This Week', 'Today', 'All']}
            selectedIndex={this.state.selectedIndex}
            onPress={selectedIndex => {
              this.setState({ selectedIndex });
            }}
            containerStyle={{ marginBottom: 20 }}
          />
          <ScrollView style={{ flex: 1, marginBottom: 20 }}>
            {data && data[0] && this.renderListCards(data)}
            <Button
              containerStyle={{ marginVertical: 20 }}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              buttonStyle={{
                height: 55,
                width: SCREEN_WIDTH,
                borderRadius: 0,
                justifyContent: 'center',
                alignItems: 'center',
                position: "relative"
              }}
              linearGradientProps={{
                colors: ['rgba(214,116,112,1)', 'rgba(233,174,87,1)'],
                start: [1, 0],
                end: [0.2, 0],
              }}
              ViewComponent={LinearGradient}
              title={`Total coins earned = ${sum}`}
              titleStyle={{
                fontFamily: 'regular',
                fontSize: 20,
                color: 'white',
                textAlign: 'center',
              }}
              onPress={() => console.log('Message Theresa')}
              activeOpacity={0.5}
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: 10,
  },
  navBar: {
    height: 60,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignContent: 'center',
  },
  nameHeader: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'regular',
    marginLeft: 20,
  },
  stretch: {
    width: 20,
    height: 20
  }
});