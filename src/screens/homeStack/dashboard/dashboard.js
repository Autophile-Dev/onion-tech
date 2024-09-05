import { StyleSheet, RefreshControl, View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import { React, useState, useEffect, useCallback } from 'react'
import { Button, Actionsheet, useDisclose, Icon, HStack, Pressable, FlatList } from "native-base";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import Greeting from "../../../components/greeting"
import appStyles from '../../../utils/appStyles';
import BottmbarHead from '../../../container/BottmbarHead';
import CoinCard from '../../../components/coinCard';
import CoinDashboard from '../../../components/coinDashboard';
import CoinAPI from '../../../services/coin_API'
import SignalsAPI from '../../../services/signalsAPI'
import Carousel from 'react-native-snap-carousel';
import NewsAPI from '../../../services/newsAPI'
import Top5CoinsDashboard from '../../../components/top5CoinsDashboard';
import DashboardNews from '../../../components/dashboardNews';
// import Carousel from 'react-native-reanimated-carousel';

export default function Dashboard({ navigation }) {
    const [error, setError] = useState(null);
    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();
    const [refresh, setRefresh] = useState(false);
    const [firstCoin, setFirstCoin] = useState({});
    const [top5Coins, setTop5Coins] = useState([]);
    const [allData, setAllData] = useState([]);
    const [topGainerCoins, setTopGainersCoins] = useState([]);
    const [topLoserCoins, setTopLoserCoins] = useState([]);
    const [topNews, setTopNews] = useState([]);
    const fetchCoinData = async () => {
        try {
            const res = await CoinAPI.first_coin();
            setFirstCoin(res?.data.Data);
            // console.log('fetch Top single Coin');
        }
        catch (error) {
            console.error("Error fetching first coin:", error);
        }
    }

    const fetchTop5CoinsData = async () => {
        try {
            const res = await CoinAPI.fetchTop5Coins();
            setTop5Coins(res?.data.Data.slice(1));
            // console.log('fetch Top Coins');
        }
        catch (error) {
            console.error("Error fetching coins:", error);
        }
    }

    const fetchTopGainerLoserCoins = async () => {
        try {
            const res = await CoinAPI.top_10_coins();
            const allCoins = res?.data?.Data || [];

            const gainers = allCoins.filter(coin => coin.RAW.USD.CHANGEPCT24HOUR > 0);
            const losers = allCoins.filter(coin => coin.RAW.USD.CHANGEPCT24HOUR <= 0);

            gainers.sort((a, b) => b.RAW.USD.CHANGEPCT24HOUR - a.RAW.USD.CHANGEPCT24HOUR);
            losers.sort((a, b) => a.RAW.USD.CHANGEPCT24HOUR - b.RAW.USD.CHANGEPCT24HOUR);

            setTopGainersCoins(gainers);
            setTopLoserCoins(losers);
            // console.log('fetch Top Gainer Loser Coins');
        }
        catch (error) {
            console.error("Error fetching top gainer and loser coins:", error);
        }
    }
    const news_fetch = async () => {
        try {
            const res = await NewsAPI.top5LatestNews()
            const filteredData = res?.data?.Data.filter(item => item?.source_info?.name !== "CoinGape");
            // console.log(filteredData);
            setTopNews(filteredData)
            // console.log('fetch Top News');
        } catch (error) {
            console.error("Error fetching top news:", error);
        }

    }

    const onRefresh = useCallback(() => {
        setRefresh(true);
        fetchCoinData();
        fetchTop5CoinsData();
        fetchTopGainerLoserCoins();
        news_fetch();
        setTimeout(() => {
            setRefresh(false);
        }, 5000);
    });
    useEffect(() => {
        const fetchData = () => {
            fetchCoinData();
            fetchTop5CoinsData();
            fetchTopGainerLoserCoins();
            news_fetch();
        };
        fetchData();
        const intervalId = setInterval(fetchData, 5000); // Refresh every 3 seconds
        return () => clearInterval(intervalId); // Cleanup function to clear interval
    }, []);
    return (

        <View style={styles.screen} >
            <View style={{ paddingHorizontal: 10 }}>
                <BottmbarHead />
            </View>

            <ScrollView style={{ flexGrow: 1, width: Dimensions.get('screen').width + 20 }}>
                <View style={{ marginVertical: 22 }}>
                    <Greeting />
                </View>
                {/* part1 starts */}
                <View style={[styles.part1]}>
                    <HStack space={3} justifyContent="space-evenly">
                        <View style={styles.part1_box}>
                            <TouchableOpacity style={styles.part_touch} onPress={() => navigation.navigate('Signals')}>
                                <Text style={[styles.part1_text]}>Signals</Text>
                                <Image
                                    style={[styles.part1_image]}
                                    source={require('../../../assets/icons/tab_signals.png')}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.part1_box}>
                            <TouchableOpacity style={styles.part_touch} onPress={() => navigation.navigate('Explore')} >
                                <Text style={[styles.part1_text]}>Explore</Text>
                                <Image
                                    style={[styles.part2_image]}
                                    source={require('../../../assets/icons/Group.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.part1_box}>
                            <TouchableOpacity style={styles.part_touch} onPress={() => navigation.navigate('Market')}>
                                <Text style={[styles.part1_text]}>Market</Text>
                                <Image
                                    style={[styles.part3_image]}
                                    source={require('../../../assets/icons/tab_market.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </HStack>
                    <HStack space={3} justifyContent="space-evenly" style={{ marginTop: 10 }}>
                        <View style={styles.part1_box}>
                            <TouchableOpacity style={styles.part_touch} onPress={() => navigation.navigate('Subscription')}>
                                <Text style={[styles.part1_text]}>Subscription</Text>
                                <Image
                                    style={[styles.part4_image]}
                                    source={require('../../../assets/icons/subscriptions.png')}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.part1_box}>
                            <TouchableOpacity style={styles.part_touch} onPress={() => navigation.navigate('Coins')}>
                                <Text style={[styles.part1_text]}>Coins</Text>
                                <Image
                                    style={[styles.part5_image]}
                                    source={require('../../../assets/icons/tab_coins.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.part1_box}>
                            <TouchableOpacity style={styles.part_touch} onPress={() => navigation.navigate('Signals')}>
                                <Text style={[styles.part1_text]}>Reports</Text>
                                <Image
                                    style={[styles.part6_image]}
                                    source={require('../../../assets/icons/Vector.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </HStack>
                </View>
                {/* part1 ends */}
                <View style={styles.topCoins}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontFamily: "Poppins", color: '#fff', textAlign: 'left', fontSize: 17 }} >Top Coins</Text>
                        <Text onPress={() => navigation.navigate('Coins')} style={{ fontFamily: "Poppins", color: '#fff', textAlign: 'right', fontSize: 12, color: '#FF9900' }} >See All</Text>
                    </View>
                    <View style={styles.dashBoardCoinTop}>
                        {firstCoin ? (
                            <FlatList
                                key={(item) => item.CoinInfo.id}
                                keyExtractor={(item) => item.CoinInfo.id}
                                data={firstCoin}

                                refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
                                renderItem={({ item }) => (
                                    <CoinDashboard item={item} />
                                )}
                            />
                        ) : (
                            <View>
                                {/* Placeholder or loading indicator while data is being fetched */}
                                <Text>Loading...</Text>
                            </View>
                        )}
                    </View>

                </View>
                {/* top coins start */}

                <View style={styles.top5CoinsDataContainer}>
                    {top5Coins ? (
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ columnGap: 12 }}
                            key={(item) => item.CoinInfo.id}
                            keyExtractor={(item) => item.CoinInfo.id}
                            data={top5Coins}
                            refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
                            renderItem={({ item }) => (
                                <Top5CoinsDashboard item={item} />
                            )}
                        />
                    ) :
                        <View>
                            <Text style={{ color: '#FF9900' }}>Loading...</Text>
                        </View>
                    }
                </View>
                <View style={styles.topCoins}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontFamily: "Poppins", color: '#fff', textAlign: 'left', fontSize: 17 }} >Top Gainers</Text>
                        <Text onPress={() => navigation.navigate('Coins')} style={{ fontFamily: "Poppins", color: '#fff', textAlign: 'right', fontSize: 12, color: '#FF9900' }} >See All</Text>
                    </View>
                </View>
                {/* Top Gainers */}
                <View style={styles.top5CoinsDataContainer}>
                    {topGainerCoins ? (
                        <FlatList
                            horizontal
                            contentContainerStyle={{ columnGap: 12 }}
                            key={(item) => item.CoinInfo.id}
                            keyExtractor={(item) => item.CoinInfo.id}
                            data={topGainerCoins}
                            refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
                            renderItem={({ item }) => (
                                <Top5CoinsDashboard item={item} />
                            )}
                        />
                    ) : (
                        <Text style={{ color: '#FF9900' }}>Loading</Text>
                    )}
                </View>

                {/* Top Losers */}
                <View style={styles.topCoins}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontFamily: "Poppins", color: '#fff', textAlign: 'left', fontSize: 17 }} >Top Losers</Text>
                        <Text onPress={() => navigation.navigate('Coins')} style={{ fontFamily: "Poppins", color: '#fff', textAlign: 'right', fontSize: 12, color: '#FF9900' }} >See All</Text>
                    </View>
                </View>
                <View style={styles.top10CoinsLoserDataContainer}>
                    {topLoserCoins.length > 0 ? (
                        <FlatList
                            horizontal
                            contentContainerStyle={{ columnGap: 12 }}
                            key={(item) => item.CoinInfo.id}
                            keyExtractor={(item) => item.CoinInfo.id}
                            data={topLoserCoins}
                            refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
                            renderItem={({ item }) => (
                                <Top5CoinsDashboard item={item} />
                            )}
                        />
                    ) : (
                        <Text style={{ color: '#FF9900' }}>No Data</Text>
                    )}
                </View>


                <View style={styles.topCoins}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontFamily: "Poppins", color: '#fff', textAlign: 'left', fontSize: 17 }} >Top News</Text>
                        <Text onPress={() => navigation.navigate('Explore')} style={{ fontFamily: "Poppins", color: '#fff', textAlign: 'right', fontSize: 12, color: '#FF9900' }} >See All</Text>
                    </View>
                </View>
                <View style={styles.topNews}>
                    {topNews ? (
                        <FlatList
                            horizontal
                            contentContainerStyle={{ columnGap: 12 }}
                            key={(item) => item.id}
                            keyExtractor={(item) => item.id}
                            data={topNews}
                            refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
                            renderItem={({ item }) => (
                                <DashboardNews item={item} />
                            )}
                        />
                    ) : (
                        <Text style={{ color: '#FF9900' }}>Loading</Text>
                    )}
                </View>
                {/* <Button onPress={onOpen}>Actionsheet</Button> */}
                <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
                    <Actionsheet.Content>
                        <Actionsheet.Item startIcon={<Icon as={<MaterialIcons name="share" />} color="muted.500" mr={3} />}>
                            Share
                        </Actionsheet.Item>
                        <Actionsheet.Item startIcon={<Icon as={<MaterialCommunityIcons name="link" />} color="muted.500" mr={3} />}>
                            Link
                        </Actionsheet.Item>
                        <Actionsheet.Item startIcon={<Icon as={<MaterialIcons name="edit" />} color="muted.500" mr={3} />}>
                            Edit name
                        </Actionsheet.Item>
                        <Actionsheet.Item startIcon={<Icon as={<MaterialIcons name="delete" />} color="muted.500" mr={3} />}>
                            Delete Collection
                        </Actionsheet.Item>
                    </Actionsheet.Content>
                </Actionsheet>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    top5CoinsDataContainer: {
        marginTop: 12,
        // marginBottom: 130,
        // backgroundColor: '#ffffff',
        width: Dimensions.get('window').width + 40,
        paddingRight: 50,
        paddingLeft: 10,

    },
    topNews: {
        marginTop: 12,

        // backgroundColor: '#ffffff',
        width: Dimensions.get('window').width + 40,
        paddingRight: 50,
        paddingLeft: 10,
        marginBottom: 130,
    },
    top10CoinsLoserDataContainer: {
        marginTop: 12,

        // backgroundColor: '#ffffff',
        width: Dimensions.get('window').width + 40,
        paddingRight: 50,
        paddingLeft: 10,
    },
    greetingsView: {
        marginHorizontal: 10,
    },
    topCoins: {
        paddingLeft: 10,
        paddingTop: 10,
        paddingRight: 50,
    },
    dashBoardCoinTop: {
        marginTop: 10,
    },
    screen: {
        padding: 10,
        flex: 1,
        // flexDirection: 'column',
        backgroundColor: appStyles.color.background,
        fontFamily: "Poppins",
    },

    text: {
        fontFamily: "Poppins",
        color: appStyles.color.font,
    },
    part1: {
        paddingLeft: 10,
        paddingRight: 50,
        fontFamily: "Poppins",
        color: appStyles.color.font,
    },
    part_touch: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    part1_box: {
        width: 110,
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 15,
        backgroundColor: '#113838',
        alignItems: 'center',
        justifyContent: 'center',
    },
    part1_image: {
        marginTop: 5,
        width: 33,
        justifyContent: 'center',
        height: 37
    },
    part2_image: {
        marginTop: 5,
        width: 40,
        justifyContent: 'center',
        height: 32,
    },
    part3_image: {
        marginTop: 5,
        width: 32,
        justifyContent: 'center',
        height: 32,
    },
    part4_image: {
        marginTop: 5,
        width: 34,
        justifyContent: 'center',
        height: 32,
    },
    part5_image: {
        marginTop: 5,
        width: 32,
        justifyContent: 'center',
        height: 32,
    },
    part6_image: {
        marginTop: 5,
        width: 42,
        justifyContent: 'center',
        height: 32,
    },
    part1_text: {
        fontFamily: "Poppins",
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 3,
        color: appStyles.color.font,
    },
})