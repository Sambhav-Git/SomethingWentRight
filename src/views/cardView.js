import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Platform ,AsyncStorage } from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image, Text, Button } from 'react-native-elements';
import axios from 'axios'

class CardView extends Component {
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
  componentDidMount(){
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
    axios('http://192.168.0.15:4567/get/1').then((data) => {
      this.setState({ data: data.data })
      var sum = this.state.data.reduce( (a, { coins }) => {
        +(coins.replace(/ /g, '')) > 0 ?  
         this.setState(({positiveCoins})=>{
          return {
            positiveCoins : positiveCoins + +(coins.replace(/ /g, ''))
        }})
        : 
         this.setState(({negetiveCoins})=>{
          return{
            negetiveCoins: negetiveCoins +(coins.replace(/ /g, ''))
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

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('positive');
      if (value !== null) {
        alert(JSON.stringify(value)) 
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      alert(JSON.stringify(error)) 

      // Error retrieving data
    }
  };

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#eee' }}>
        <View style={styles.cardWrapper}>
          <View style={styles.card}>
              <Text style={styles.text}>Current Coins</Text>
              <View style={{flexDirection: "row"}}>
                <Text style={styles.text2}>{this.state.sum}</Text>
                <Image style={styles.stretch} source={require('../images/dollar.png')} />
              </View>
              <View>
                <Text style={styles.text3}>{"Total Coins Earned(+)"}&nbsp;&nbsp;{this.state.positiveCoins}</Text>
                <Text style={styles.text4}>{"Total Coins Lost(-)"}&nbsp;&nbsp;{this.state.negetiveCoins}</Text>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        width: 46,
                        alignSelf: "flex-end",
                        alignContent: "flex-end",
                        alignItems: "flex-end",
                        paddingRight: 90,
                        paddingTop: 10
                    }}
                    />
              </View>
              <View>
                <Text style={styles.text5}>{"Total Remaining Coins"}&nbsp;&nbsp;{this.state.sum}</Text>
                <Text style={styles.text4}>{"Coins Redeemed (-)"}&nbsp;&nbsp;{-0}</Text>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        width: 46,
                        alignSelf: "flex-end",
                        alignContent: "flex-end",
                        alignItems: "flex-end",
                        paddingRight: 90,
                        paddingTop: 10
                    }}
                    />
              </View>
              <View>
                <Text style={styles.text5}>{"Current Coins"}&nbsp;&nbsp;<Text style={{
                        color: "green"
                    }}>{this.state.sum}</Text></Text>
              </View>
              <View style={{
                paddingRight: 30,
                paddingTop: 60,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Button
              title="Redeem Coins (-50)"
              onPress={() => this.props.navigation.navigate("ScratchCard")}
              buttonStyle={{
                height: 50,
                width: 250,
                borderWidth: 2,
                borderColor: 'black',
                borderRadius: 30,
              }}
              containerStyle={{ marginVertical: 10 }}
              titleStyle={{ fontWeight: 'bold', color: 'white' }}
            />
              </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

CardView.navigationOptions = {
  title: 'My Wallet',
};

const styles = StyleSheet.create({
    text: {
    //justifyContent: 'center',
    //alignItems: 'center',
    paddingLeft: 40,
    paddingTop: 40,
    fontSize: 40
    //backgroundColor: colors.primary2,
  },
  text2: {
    //justifyContent: 'center',
    //alignItems: 'center',
    paddingLeft: 40,
    fontSize: 40,
    color: "green"
    //backgroundColor: colors.primary2,
  },
  text3:{
    paddingRight: 30,
    paddingTop: 60,
    fontSize: 20,
    alignContent: "flex-end",
    textAlign: "right"
  },
  text4:{
    paddingRight: 30,
    paddingTop: 10,
    fontSize: 20,
    alignContent: "flex-end",
    textAlign: "right"
  },
  text5:{
    paddingRight: 30,
    paddingTop: 10,
    fontSize: 20,
    alignContent: "flex-end",
    textAlign: "right"
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
  },
  cardWrapper: {
    flex:1,
    flexDirection: 'row'
  },
  card: {
    width: 380,
    height: 700,
    backgroundColor: '#fff',
    marginLeft: 15,
    marginTop: 30,
    borderRadius: 15
  },
  stretch: {
    width: 30,
    height: 30,
    marginTop: 10
  }
});

export default CardView;
