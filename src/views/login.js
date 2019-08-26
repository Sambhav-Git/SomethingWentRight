import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import LoginScreen3 from './login/screen3';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView horizontal pagingEnabled decelerationRate={0.993}>
          <LoginScreen3 navigation={this.props.navigation}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
