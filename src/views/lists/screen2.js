import * as React from 'react';
import { Text, View, StyleSheet, WebView } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{width: 400, height: 400}}>
          <WebView style={{flex: 1}} source={{uri: "https://mq3157n67p.codesandbox.io/"}} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    alignItems: "center"
  },
});
