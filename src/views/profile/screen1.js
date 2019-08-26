import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Button } from 'react-native-elements';
import { LinearGradient } from '../../components/LinearGradient';

const SCREEN_WIDTH = Dimensions.get('window').width;

const IMAGE_SIZE =  120;    // SCREEN_WIDTH - 180;

class CustomButton extends Component {
  constructor() {
    super();

    this.state = {
      selected: false,
    };
  }

  componentDidMount() {
    const { selected } = this.props;

    this.setState({
      selected,
    });
  }

  render() {
    const { title } = this.props;
    const { selected } = this.state;

    return (
      <Button
        title={title}
        titleStyle={{ fontSize: 15, color: 'white', fontFamily: 'regular' }}
        buttonStyle={
          selected
            ? {
                backgroundColor: 'rgba(213, 100, 140, 1)',
                borderRadius: 100,
                width: 127,
              }
            : {
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 30,
                width: 127,
                backgroundColor: 'transparent',
              }
        }
        containerStyle={{ marginRight: 10 }}
        onPress={() => this.setState({ selected: !selected })}
      />
    );
  }
}

export default class LoginScreen1 extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={styles.statusBar} />
          <ScrollView style={{ flex: 1 }}>
            <View style={{ alignItems: 'flex-start', flexDirection : 'row', margin: 10, borderBottomColor: 'black',
             borderBottomWidth: 3 }}>
              <Image
                 source={ require('../../images/profile.png') }
                style={{
                  margin: 10,
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  borderRadius: 10,
                }}
              />
              <View style={{ margin: 5 }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 25,
                  color: 'black',
                  fontFamily: 'bold',
                }}
              >
                Sam Daniels
              </Text>
              <View style={{flexDirection : 'row', marginBottom: 20}}>
              <Text  style={{
                  fontSize: 14,
                  color: 'black',
                }}>Overall Rating</Text>
                <Text style={{ marginLeft: 36, color: 'green' }}>7/10</Text>
                </View>
                <View style={{flexDirection : 'row'}}>
              <Text  style={{
                  fontSize: 14,
                  color: 'black',
                }}>Land Rover</Text>
                <Text style={{ marginLeft: 40 }}>Discovery</Text>
                </View>

              </View>
            </View>
            <View style={{ alignItems: 'flex-start', flexDirection : 'row', margin: 10 , borderBottomColor: 'black',
             borderBottomWidth: 3, height: 80}}>
                  <View style={{ margin: 10 }}>
              <Text
                style={{
                  margin: 5,
                  flex: 1,
                  fontSize: 15,
                  color: 'black',
                  fontFamily: 'bold',
                }}
              >
               Link Account
              </Text>

              </View>
              <Image
                source={ require('../../images/bank.jpg') }
                style={{
                  marginTop :13,
                  marginLeft: 160,
                  width: IMAGE_SIZE - 80,
                  height: IMAGE_SIZE - 90,
                  borderRadius: 10,
                }}
              />
               <Image
                source={ require('../../images/arrow.jpg') }
                style={{
                  marginTop :13,
                  marginLeft: 20,
                  width: IMAGE_SIZE - 90,
                  height: IMAGE_SIZE - 90,
                  borderRadius: 10,
                }}
              />
            </View>
            <View style={{ alignItems: 'flex-start', flexDirection : 'row', margin: 10 , borderBottomColor: 'black',
             borderBottomWidth: 3 ,  height: 80}}>
              <View style={{ margin: 10 }}>
              <Text
                style={{
                  margin: 5,
                  flex: 1,
                  fontSize: 15,
                  color: 'black',
                  fontFamily: 'bold',
                }}
              >
                Personal Details
              </Text>

              </View>
              <Image
                source={ require('../../images/download1.jpeg') }
                style={{
                  marginTop :13,
                  marginLeft: 140,
                  width: IMAGE_SIZE - 80,
                  height: IMAGE_SIZE - 90,
                  borderRadius: 10,
                }}
              />
               <Image
                source={ require('../../images/arrow.jpg') }
                style={{
                  marginTop :13,
                  marginLeft: 20,
                  width: IMAGE_SIZE - 90,
                  height: IMAGE_SIZE - 90,
                  borderRadius: 10,
                }}
              />
            </View>
            <View style={{ flex: 1, marginTop: 30 }}>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
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
    fontSize: 22,
    textAlign: 'center',
  },
  infoTypeLabel: {
    fontSize: 15,
    textAlign: 'right',
    color: 'rgba(126,123,138,1)',
    fontFamily: 'regular',
    paddingBottom: 10,
  },
  infoAnswerLabel: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'regular',
    paddingBottom: 10,
  },
});