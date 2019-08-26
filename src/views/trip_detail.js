import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import {
    Text,
    Card,
    Tile,
    Icon,
    Avatar,
} from 'react-native-elements';
import colors from '../config/colors';
import ColorBar from './report/color_bar';
import axios from 'axios'

export default class TripDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Date', 'Time (from to)', 'Avg Speed (Km/hr)', 'Total Drive', 'Rash Acceleration  Incidences', 'Rash Breaking Incidences', 'Over Speeding (sec)', 'Score', 'Coins Earned'],
            widthArr: [150, 100, 100, 100, 100, 100, 100, 100],
            coins: 0
        }
    }
    componentDidMount(){
        this.focusListener = this.props.navigation.addListener('didFocus', () => {    
        axios('http://192.168.0.15:4567/add/1').then(async (data) => {
            return data.data
        }).catch(err => {
            console.log(err)
        })
    })
    }
    componentWillUnmount() {
        // Remove the event listener before removing the screen from the stack
        this.focusListener.remove();
    }

    render() {
        const state = this.state;
        const tableData = [];
        for (let i = 0; i < 30; i += 1) {
            const rowData = [];
            for (let j = 0; j < 9; j += 1) {
                rowData.push(`${i}${j}`);
            }
            tableData.push(rowData);
        }
        const user = this.props.navigation.state.params.user;

        return (
            <ScrollView style={styles.container}>
                <View style={styles.hero}>
                    <Text style={styles.heading}>Trip Details</Text>
                </View>
                <View style={styles.wrapper} >
                    <Text style={styles.subhead}>Driving Speeds</Text>
                    <ColorBar head="0 km/hr [Idling]" barColor="#173f5f" perc={parseInt('0')} />
                    <ColorBar head="1-10 km/hr" barColor="#20639B" perc={parseInt(user.idle_1_10)} />
                    <ColorBar head="10-35 km/hr" barColor="#3CAEA3" perc={parseInt(user.idle_10_35)} />
                    <ColorBar head="35-70 km/hr" barColor="#F6D55C" perc={parseInt(user.idle_35_70)} />
                    <ColorBar head="70-100 km/hr" barColor="#eb8136" perc={parseInt(user.idle_70_100)} />
                    <ColorBar head="100+ km/hr" barColor="#bf0000" perc={parseInt(user.idle_100)} />
                </View>
                <ScrollView style={{ marginTop: 40, backgroundColor: '#fff', paddingTop: 30, paddingBottom: 30 }}>
                    <View style={styles.row}>
                        <View style={styles.cell}>
                            <Text style={{ ...styles.subhead, fontSize: 15, paddingLeft: 10 }}>Date</Text>
                            <Text style={styles.infoAnswerLabel}>{user.date}</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={{ ...styles.subhead, fontSize: 15, paddingLeft: 10 }}>Time (from to)</Text>
                            <Text style={styles.infoAnswerLabel}>{user.time}</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={{ ...styles.subhead, fontSize: 15, paddingLeft: 10 }}>Avg Speed(Km/hr)</Text>
                            <Text style={styles.infoAnswerLabel}>{user.avgSpeed}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.cell}>
                            <Text style={{ ...styles.subhead, fontSize: 15, paddingLeft: 10, height: 40, paddingTop: 10 }}>Total Drive</Text>
                            <Text style={styles.infoAnswerLabel}>{user.totalDriven}</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={{ ...styles.subhead, fontSize: 15, paddingLeft: 10 }}>Rash Acceleration  Incidences</Text>
                            <Text style={styles.infoAnswerLabel}>{user.rashAccelerationIncidences}</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={{ ...styles.subhead, fontSize: 15, paddingLeft: 10 }}>Rash Breaking Incidences</Text>
                            <Text style={styles.infoAnswerLabel}>{user.rashBreakingIncidences}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.cell}>
                            <Text style={{ ...styles.subhead, fontSize: 15, paddingLeft: 10 }}>Over Speeding(sec)</Text>
                            <Text style={styles.infoAnswerLabel}>{user.overSpeeding}</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={{ ...styles.subhead, fontSize: 15, paddingLeft: 10 }}>Score</Text>
                            <Text style={styles.infoAnswerLabel}>{user.score}</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={{ ...styles.subhead, fontSize: 15, paddingLeft: 10 }}>Coins Earned</Text>
                            <Text style={styles.infoAnswerLabel}>{user.coins}</Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ marginTop: 40, marginBottom: 50, backgroundColor: '#fff', padding: 30, flex:1, flexDirection: 'row', alignItems: 'center' }}>
                    {(user.coins.charAt(0) === "+") ? (
                        <Image
                            source={require('../images/good.png')}
                            style={{ height: 50, width: 50 }}
                        />
                    ) : (
                            <Image
                                source={require('../images/bad.png')}
                                style={{height: 50, width: 50}}
                            />
                        )}

                    <Text style={styles.infoAnswerLabel}>{user.comments}</Text>
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
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22,
    },
    subhead: {
        fontSize: 22,
        color: "#d11208",
        borderLeftColor: "#d11208",
        borderLeftWidth: 3,
        paddingLeft: 15,
        fontWeight: "bold"
    },
    wrapper: {
        backgroundColor: "#fff",
        padding: 20,
        flex: 1,
        width: '100%'
    },
    infoAnswerLabel: {
        fontSize: 18,
        color: '#666',
        fontFamily: 'regular',
        paddingBottom: 10,
        paddingLeft: 10,
        fontWeight: '500'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 30,
    },
    cell: {
        width: '33%',
        marginRight: "1%"
    }
}); 
