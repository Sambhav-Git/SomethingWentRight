import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image, Dimensions } from 'react-native';
import {
    Text,
    Card,
    Tile,
    Icon,
    Avatar,
} from 'react-native-elements';
import colors from '../config/colors';
const WINDOW_WIDTH = Dimensions.get('window').width;

export default class Insurance extends Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <Image
                    source={require('../images/insurance.png')}
                    style={{ marginLeft: -30, height: 300 }}
                    resizeMode="center"
                />
                <View style={styles.row}>
                    <Text style={styles.infoTypeLabel}>Policy Provider</Text>
                    <Text style={styles.infoAnswerLabel}>ICICI Lombard General Insurance Company</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.infoTypeLabel}>Name</Text>
                    <Text style={styles.infoAnswerLabel}>Sam Daniels</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.infoTypeLabel}>Policy Number</Text>
                    <Text style={styles.infoAnswerLabel}>1238/64686/1618/45648</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.infoTypeLabel}>Issue Date</Text>
                    <Text style={styles.infoAnswerLabel}>Jun 20, 2019</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.infoTypeLabel}>Expiry Date</Text>
                    <Text style={styles.infoAnswerLabel}>Jun 19, 2020</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.infoTypeLabel}>Premium Paid</Text>
                    <Text style={styles.infoAnswerLabel}>1500</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef',
    },
    hero: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: colors.primary2,
    },
    infoTypeLabel: {
        fontSize: 15,
        textAlign: 'left',
        color: '#666',
        fontFamily: 'regular',
        paddingBottom: 10,
        fontSize: 18,
        fontWeight: 'bold',
        width: '40%'
    },
    infoAnswerLabel: {
        fontSize: 18,
        color: '#666',
        fontFamily: 'regular',
        paddingBottom: 10,
        width: '60%'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 30,
    }
});
