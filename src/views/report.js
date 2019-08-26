import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
    Text,
    Card,
    Tile,
    Icon,
    Avatar,
} from 'react-native-elements';
import colors from '../config/colors';
import ColorBar from './report/color_bar';
import Table from 'react-native-simple-table'
import axios from 'axios'

const columns = [
    {
        title: 'Date',
        dataIndex: 'date',
        width: 150
    },
    {
        title: 'Time ( from to)',
        dataIndex: 'time',
        width: 105
    },
    {
        title: 'Avg Speed (Km/hr)',
        dataIndex: 'avgSpeed',
        width: 140
    },
    {
        title: 'Total Drive',
        dataIndex: 'totalDriven',
        width: 105
    },
    {
        title: 'Rash Acceleration  Incidences',
        dataIndex: 'rashAccelerationIncidences',
        width: 105
    },
    {
        title: 'Rash Breaking Incidences',
        dataIndex: 'rashBreakingIncidences',
        width: 105
    },
    {
        title: 'Over Speeding',
        dataIndex: 'overSpeeding',
        width: 105
    },
    {
        title: 'Score',
        dataIndex: 'score',
        width: 105
    },
    {
        title: 'Coins Earned',
        dataIndex: 'coins',
        width: 105
    },
]
// 

export default class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widthArr: [150, 100, 100, 100, 100, 100, 100, 100],
            data: [],
            "idle_10_35": "",
            "idle_1_10": "",
            "idle_100": "",
            "idle_35_70": "",
            "idle_70_100": "",
        }
    }
    componentDidMount() {
        //alert("hi")
    this.focusListener = this.props.navigation.addListener('didFocus', () => {

        axios('http://192.168.0.15:4567/get/1').then(async (data) => {
            await this.setState({ data: data.data })
            var n = data.data.length;
            var idle_10_35 = this.state.data.reduce((a, { idle_10_35 }) => a + parseInt(idle_10_35), 0)/n;
            var idle_1_10 = this.state.data.reduce((a, { idle_1_10 }) => a + parseInt(idle_1_10), 0)/n;
            var idle_100 = this.state.data.reduce((a, { idle_100 }) => a + parseInt(idle_100), 0)/n;
            var idle_35_70 = this.state.data.reduce((a, { idle_35_70 }) => a + parseInt(idle_35_70), 0)/n;
            var idle_70_100 = this.state.data.reduce((a, { idle_70_100 }) => a + parseInt(idle_70_100), 0)/n;
            await this.setState({ idle_10_35, idle_1_10, idle_100, idle_35_70, idle_70_100})
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

        const { idle_10_35, idle_1_10, idle_100, idle_35_70, idle_70_100} = this.state;

        return (
            <ScrollView style={styles.container}>
                <View style={styles.wrapper} >
                    <Text style={styles.subhead}>Driving Speeds</Text>
                    <ColorBar head="0 km/hr [Idling]" barColor="#173f5f" perc={0} />
                    <ColorBar head="1-10 km/hr" barColor="#20639B" perc={parseInt(idle_1_10)} />
                    <ColorBar head="10-35 km/hr" barColor="#3CAEA3" perc={parseInt(idle_10_35)} />
                    <ColorBar head="35-70 km/hr" barColor="#F6D55C" perc={parseInt(idle_35_70)} />
                    <ColorBar head="70-100 km/hr" barColor="#eb8136" perc={parseInt(idle_70_100)} />
                    <ColorBar head="100+ km/hr" barColor="#bf0000" perc={parseInt(idle_100)} />
                </View>
                <View style={styles.wrapper} >

                    <Text style={styles.subhead}>Driving Summary</Text>

                    <ScrollView style={styles.tableWrapper} horizontal={true}>

                        <View>
                            <Table height={320} columnWidth={70} columns={columns} dataSource={this.state.data} />
                        </View>
                    </ScrollView>
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
        color: "#20639B",
        borderLeftColor: "#20639B",
        borderLeftWidth: 3,
        paddingLeft: 15,
        fontWeight: "bold"
    },
    wrapper: {
        backgroundColor: "#fff",
        padding: 20
    },
    tableWrapper: { flex: 1, paddingTop: 30, backgroundColor: '#fff', fontWeight: "bold" },
    header: { height: 50, backgroundColor: '#537791', },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#537791', }
}); 
