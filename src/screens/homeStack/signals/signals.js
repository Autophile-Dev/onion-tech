import { StyleSheet, Text, View, Image, RefreshControl, Dimensions } from 'react-native'
import { Box, FlatList, Center, Pressable, ScrollView } from "native-base";
import React, { useState, useEffect } from 'react';
import appStyles from '../../../utils/appStyles';
import SignalsCard from '../../../components/signalsCard.js';
import SignalsAPI from '../../../services/signalsAPI'
import CoinAPI from '../../../services/coin_API'
import BottmbarHead from '../../../container/BottmbarHead';
import { useDispatch } from "react-redux";
import { addTask } from "../../../redux/TaskSlice";

export default function Signals() {
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = React.useState(false);
    const [alldata, setAlldata] = useState([""]);
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [all, setAll] = React.useState(true);
    const [active, setActive] = React.useState(false);

    const active_signals = () => {
        setAll(false)
        setActive(true)
        var newArray = alldata.filter(function (el) {
            return el.signal_status == "active"
        });
        setFilteredDataSource(newArray)
    }
    const all_signals = () => {
        setAll(true)
        setActive(false)
        setFilteredDataSource(alldata)
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        signals_fetch()
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    }, []);



    const cdatafetch = async (tsym) => {
        const res1 = await CoinAPI.multi_coins("fsyms=USDT&tsyms=" + tsym)
        dispatch(
            addTask({
                coininfo: res1.data.DISPLAY.USDT,
            })
        )
    }

    const signals_fetch = async () => {
        try {
            const res = await SignalsAPI.signals()
            console.log(res.data);
            setAlldata(res.data.data);
            setFilteredDataSource(res.data.data)
        } catch (err) {
            console.log("Error: ", err);
        }



    }
    useEffect(() => {
        signals_fetch()
    }, [])

    return (
        <View style={styles.screen} >
            <View style={{ paddingHorizontal: 10 }}>
                <BottmbarHead />
            </View>
            <ScrollView style={{ flexGrow: 1, width: Dimensions.get('screen').width + 20 }}>
                <View style={{ marginVertical: 22, marginHorizontal: 10 }}>
                    <Text style={{
                        marginLeft: 5,
                        color: appStyles.color.font,
                        fontSize: 20,
                        fontWeight: 'bold',
                        fontFamily: 'Poppins',

                    }} >Signals </Text>
                </View>
                <View style={{ flexDirection: "row", backgroundColor: '#1C4C4C', width: Dimensions.get('window').width + 40, marginLeft: 10, }}>
                    <Pressable style={{
                        backgroundColor: all ? '#1E953F' : '#8B8B8B',
                        paddingVertical: 5,
                        alignItems: 'center',
                        paddingHorizontal: 14,
                        borderRadius: 15,
                        borderWidth: 1,
                        borderColor: '#fff',
                        borderStyle: 'solid',
                        justifyContent: 'center',
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                        onPress={() => all_signals()}
                    >
                        <Text style={{ fontFamily: "Poppins", fontSize: 12, textAlign: 'center', color: '#fff' }}>Active</Text></Pressable>

                    <Pressable style={{
                        backgroundColor: active ? '#1E953F' : '#8B8B8B',
                        marginLeft: 10,
                        paddingVertical: 5,
                        paddingHorizontal: 14,
                        borderRadius: 15,
                        borderWidth: 1,
                        borderColor: '#fff',
                        borderStyle: 'solid',
                        justifyContent: 'center',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                        onPress={() => active_signals()}
                    >
                        <Text style={{ fontFamily: "Poppins", fontSize: 11, textAlign: 'center', color: '#fff' }}>All</Text></Pressable>

                </View>
                <Center style={{ marginBottom: 193, marginRight: 40, }}>

                    <FlatList data={filteredDataSource}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        renderItem=
                        {({
                            item
                        }) =>
                            <SignalsCard
                                keyExtractor={item => item.id}
                                item={item}
                                key={item.id}
                            />
                        }
                    />

                </Center>
            </ScrollView>





        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        backgroundColor: appStyles.color.background,
        fontFamily: "Poppins",
    },
    text: {
        color: appStyles.color.font,
        padding: 1
    },
})