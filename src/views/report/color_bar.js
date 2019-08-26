import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
    Text,
    Card,
    Tile,
    Icon,
    Avatar,
} from 'react-native-elements';

export default class ColorBar extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={{ fontSize: 18, padding: 5 }}>{this.props.head}</Text>
                <View style={{ backgroundColor: "#aaa", height: 35, borderRadius: 5 }}>
                    <View style={{
                        backgroundColor: this.props.barColor,
                        width: `${this.props.perc}%`,
                        height: "100%",
                        borderRadius: 5
                    }}
                    >
                    </View>
                    <Text style={{
                        color: '#fff', fontSize: 18, fontWeight: "bold", marginLeft: 20, position: "absolute", marginTop: 6,
                        textShadowColor: 'rgba(0, 0, 0, 0.75)',
                        textShadowRadius: 5
                    }}>{this.props.perc}%</Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        color: '#fff',
        margin: 5
    },
});
