import * as React from 'react';
import { View, StyleSheet, WebView, Text } from 'react-native';

export default class ScrachCard extends React.Component {
  render() {
      //alert("hi")
    return (
      <View style={styles.container}>
        <View style={{width: 400, marginTop: 100, height: 400}}>
          <WebView style={{flex: 1, width: 400}} source={{uri: "https://s.codepen.io/vishalvishalgupta/debug/NWKpRqa/LDMmdEdDVwKk"}} />
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
