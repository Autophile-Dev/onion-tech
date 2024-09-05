import { StyleSheet, Text, View, Image, FlatList, SafeAreaView, ScrollView, RefreshControl, TouchableOpacity, Dimensions } from 'react-native'
import React, { useRef, useMemo, useState, useEffect } from 'react';
import appStyles from '../../../utils/appStyles';
import BottmbarHead from '../../../container/BottmbarHead';
import CoinCard from '../../../components/coinCard.js';
import CoinAPI from '../../../services/coin_API'
import Splash from '../../splash/splash.js';





const Coins = () => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [alldata, setAlldata] = useState([]);
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [toppers, setToppers] = React.useState(true);
    const [gainer, setGainer] = React.useState(false);
    const [loser, setLosers] = React.useState(false);

    const coin_fetch = async () => {
        const res = await CoinAPI.coin_volumes()
        setFilteredDataSource(res?.data.Data)
        setAlldata(res?.data.Data)
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        coin_fetch()
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    }, []);
    const topper = () => {
        setToppers(true)
        setGainer(false)
        setLosers(false)
        setFilteredDataSource(alldata)
    }
    const gainers = () => {
        setToppers(false)
        setGainer(true)
        setLosers(false)
        var newArray = alldata?.filter(function (el) {
            return el.RAW.USD.CHANGEPCT24HOUR > 0
        });
        newArray.sort((a, b) => b.RAW.USD.CHANGEPCT24HOUR - a.RAW.USD.CHANGEPCT24HOUR);
        newArray = newArray.filter((el) => el.RAW.USD.CHANGEPCT24HOUR > 0);
        setFilteredDataSource(newArray)
    }
    const losers = () => {
        setToppers(false)
        setGainer(false)
        setLosers(true)
        var newArray = alldata?.filter(function (el) {
            return el.RAW.USD.CHANGEPCT24HOUR <= 0
        });
        newArray.sort((a, b) => a.RAW.USD.CHANGEPCT24HOUR - b.RAW.USD.CHANGEPCT24HOUR);
        newArray = newArray.filter((el) => el.RAW.USD.CHANGEPCT24HOUR <= 0);
        setFilteredDataSource(newArray)
    }
    useEffect(() => {
        coin_fetch()
    }, [])


    return (
        <>

            <SafeAreaView style={styles.container}>
                <View style={{ paddingHorizontal: 10 }}>
                    <BottmbarHead />
                </View>
                <ScrollView style={{ flexGrow: 1, width: Dimensions.get('screen').width + 40 }}>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{
                            color: '#fff',
                            fontFamily: 'Poppins',
                            marginLeft: 4,
                            marginTop: 22,
                            marginBottom: 22,
                            fontWeight: 'bold',
                            fontSize: 20,

                        }} >Coins </Text>
                        <View style={{ flexDirection: "row", gap: 10, marginBottom: 10, backgroundColor: '#1C4C4C' }}>
                            <TouchableOpacity
                                onPress={topper}
                                style={{
                                    backgroundColor: toppers ? '#FF9900' : '#1E953F',
                                    paddingHorizontal: 8,
                                    paddingVertical: 6,
                                    borderRadius: 15,
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderColor: '#ffffff',
                                    borderStyle: 'solid',
                                    justifyContent: 'center'
                                }}>
                                <Text style={{ fontFamily: "Poppins", alignItems: 'center', font: '#fff', fontSize: 11, textAlign: 'center', color: appStyles.color.font }}>Top Coins</Text></TouchableOpacity>

                            <TouchableOpacity
                                onPress={gainers}
                                style={{
                                    backgroundColor: gainer ? '#FF9900' : '#1E953F',
                                    paddingHorizontal: 8,
                                    paddingVertical: 6,
                                    borderRadius: 15,
                                    borderWidth: 1,
                                    borderColor: '#ffffff',
                                    borderStyle: 'solid',
                                    justifyContent: 'center'
                                }}>
                                <Text style={{ fontFamily: "Poppins", font: '#fff', fontSize: 11, textAlign: 'center', color: '#fff' }}>Top Gainers</Text></TouchableOpacity>
                            <TouchableOpacity
                                onPress={losers}
                                style={{
                                    backgroundColor: loser ? '#FF9900' : '#1E953F',
                                    paddingHorizontal: 8,
                                    paddingVertical: 6,
                                    borderRadius: 15,
                                    borderWidth: 1,
                                    borderColor: '#fff',
                                    borderStyle: 'solid',
                                    justifyContent: 'center'
                                }}>
                                <Text style={{ fontFamily: "Poppins", font: '#fff', fontSize: 11, textAlign: 'center', color: '#fff' }}>Top Loosers</Text></TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.coinLists}>
                        <View style={styles.listHead}>
                            <Text style={styles.listHeadText}>Name/Vol</Text>
                            <Text style={styles.listHeadTextCenter}>24h Change</Text>
                            <Text style={styles.listHeadText}>Current Price</Text>
                        </View>
                        {
                            alldata.length > 1 ? (
                                <FlatList
                                    keyExtractor={(item) => item.CoinInfo.id}
                                    data={filteredDataSource}
                                    refreshControl={
                                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                    }
                                    renderItem={({ item }) => (
                                        <CoinCard
                                            item={item}
                                        />
                                    )}
                                />
                            ) :
                                <View>
                                    <Splash />
                                </View>
                        }
                    </View>


                </ScrollView>






            </SafeAreaView >



        </>

    )
}


export default Coins;


const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        backgroundColor: appStyles.color.background,
        fontFamily: "Poppins",
    },
    coinLists: {
        paddingLeft: 10,
        paddingRight: 68,
    },
    listHead: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 5
    },
    listHeadText: {
        fontWeight: '900',
        color: '#ffffff',
        maxWidth: 70,
    },
    listHeadTextCenter: {
        fontWeight: '900',
        color: '#ffffff',
        paddingLeft: 60,
    },
    text: {
        color: appStyles.color.font,
        padding: 1
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#A9ABB1',
        marginHorizontal: 16,
        marginTop: 16,
    },
    titleWrapper: {
        marginTop: 20,
        paddingHorizontal: 16,
    },
    largeTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#A9ABB1',
        marginHorizontal: 16,
        marginTop: 16,
    },
    bottomSheet: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
})