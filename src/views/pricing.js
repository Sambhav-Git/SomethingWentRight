import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Platform } from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { PricingCard, Text } from 'react-native-elements';

class Pricing extends Component {
  render() {
    return (
      <ScrollView style={{ backgroundColor: '#eee' }}>
        <View style={styles.hero}>
          <Icon color="white" name="games" size={62} />
          <Text style={styles.heading}>Total Earnings</Text>
          <Text style={styles.heading}>₹ 15</Text>
        </View>
        <View style={styles.cardWrapper}>
          <View style={styles.card}>
            <Text style={{textAlign: "center", position: "relative", fontSize:30, top:"30%", bottom:"30%"}}>{"You Won"}</Text>
            <Text style={{textAlign: "center", position: "relative", fontSize:30, top:"40%", bottom:"90%"}}>{"₹ 15"}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

Pricing.navigationOptions = {
  title: 'Pricing',
};

const styles = StyleSheet.create({
  hero: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: colors.primary2,
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
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    marginLeft: 15,
    marginTop: 15,
    borderRadius: 5
  }
});

export default Pricing;
