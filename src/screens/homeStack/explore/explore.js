import { StyleSheet, View, Image, SafeAreaView, ScrollView, RefreshControl, Dimensions, TouchableOpacity } from 'react-native'
import { Box, FlatList, Text, Center, Pressable, Skeleton } from "native-base";
import React, { useState, useEffect, useRef } from 'react';
import BottmbarHead from '../../../container/BottmbarHead';
import NewsAPI from '../../../services/newsAPI'
import appStyles from '../../../utils/appStyles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ExploreNewsCard from '../../../components/exploreNews';
import NewsCard from '../../../components/newsCard';


export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Dimensions.get('window').width;
export default function Explore({ navigation }) {

    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = useState(true);
    const [exploreTop3News, setExploreTop3News] = useState([]);
    const [index, setIndex] = useState(0);
    const isCarousel = useRef(null);
    const [exploreTab, setExploreTab] = useState(0);
    const [newsTabs, setNewsTabs] = useState(0);
    const [topNews, setTopNews] = useState([]);
    const [topBTCNews, setTopBTCNews] = useState([]);
    const [topETHNews, setTopETHNews] = useState([]);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        top3NewsFetch();
        news_fetch();
        topBTC();
        topETH();
    }, []);
    const news_fetch = async () => {
        // loading here
        const res = await NewsAPI.latest_news()
        const filteredData = res?.data?.Data.filter(item => item?.source_info?.name !== "CoinGape");
        setTopNews(filteredData);
        // end loading here
    }
    const topBTC = async () => {
        // start loading here
        const res = await NewsAPI.topBTCNews();
        const filteredData = res?.data?.Data.filter(item => item?.source_info?.name !== "CoinGape");
        setTopBTCNews(filteredData);
        // end loading here
    }
    const topETH = async () => {
        // start loading here
        const res = await NewsAPI.topETHNews();
        const filteredData = res?.data?.Data.filter(item => item?.source_info?.name !== "CoinGape");
        setTopETHNews(filteredData);
        // end loading here
    }
    const top3NewsFetch = async () => {
        setLoading(true);
        const res = await NewsAPI.latest_news();
        const filteredData = res?.data?.Data.filter(item => item?.source_info?.name !== "CoinGape");
        const topNews = filteredData.slice(0, 3);
        setExploreTop3News(topNews);
        setLoading(false);
    }
    return (
        <View style={styles.screen}>
            <View style={{ paddingHorizontal: 10 }}>
                <BottmbarHead />
            </View>
            <ScrollView style={{ flexGrow: 1, marginBottom: 60, width: Dimensions.get('screen').width + 40 }}>
                <View style={{ marginVertical: 22, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 14, paddingRight: 60 }}>
                    <Text style={{ fontSize: 18, fontFamily: "Poppins", fontWeight: 'bold', color: '#ffff', }}>Explore</Text>
                    <View>
                        <Image style={styles.searchImage}
                            source={require('../../../assets/icons/search.png')}
                        />
                    </View>
                </View>
                {/* Carousel */}
                <View style={styles.carouselContainer}>
                    {/* <Text>Waleed</Text> */}
                    {loading ? (
                        <Skeleton style={styles.exploreSkeleton} startColor="#246B6B" endColor="#0E4545" borderRadius="15" />
                    ) : (
                        <Carousel
                            autoplay={true}
                            autoplayDelay={1000}
                            autoplayInterval={3000}
                            ref={isCarousel}
                            data={exploreTop3News}
                            sliderWidth={SLIDER_WIDTH}
                            windowSize={1}
                            onSnapToItem={index => setIndex(index)}
                            renderItem={({ item }) => <ExploreNewsCard item={item} />}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                            itemWidth={ITEM_WIDTH}
                        />
                    )}

                    <Pagination
                        dotsLength={3}
                        activeDotIndex={index}
                        carouselRef={isCarousel}
                        dotStyle={{
                            borderWidth: 1,
                            width: 8,
                            borderColor: '#FF9900',
                            backgroundColor: '#FF9900',
                            height: 8,
                        }}
                        inactiveDotStyle={{
                            borderWidth: 1,
                            width: 8,
                            height: 8,
                            borderColor: '#39AFAF',
                            backgroundColor: 'transparent',
                        }}
                        inactiveDotOpacity={0.6} // Adjust opacity as needed
                        inactiveDotScale={0.8}
                    />
                </View>
                {/* Tabs */}
                <View style={styles.tabsContainer}>
                    <View style={styles.innerTabContainer}>
                        <Pressable onPress={() => setExploreTab(0)} style={{ display: 'flex', backgroundColor: exploreTab === 0 ? '#FF9900' : '#FFFFFF', alignItems: 'center', borderRadius: 7, paddingHorizontal: 30, paddingVertical: 10 }}>
                            <View>
                                <Text style={{ fontSize: 12, fontFamily: "Poppins", fontWeight: 'bold', color: exploreTab === 0 ? '#FFFF' : '#1E5A5A' }} >News</Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={() => setExploreTab(1)} style={{ display: 'flex', backgroundColor: exploreTab === 1 ? '#FF9900' : '#FFFFFF', alignItems: 'center', borderRadius: 7, paddingHorizontal: 30, paddingVertical: 10 }}>
                            <View>
                                <Text style={{ fontSize: 12, fontFamily: "Poppins", fontWeight: 'bold', color: exploreTab === 1 ? '#FFFF' : '#1E5A5A' }} >Market Updates</Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={() => setExploreTab(2)} style={{ display: 'flex', backgroundColor: exploreTab === 2 ? '#FF9900' : '#FFFFFF', alignItems: 'center', borderRadius: 7, paddingHorizontal: 30, paddingVertical: 10 }}>
                            <View>
                                <Text style={{ fontSize: 12, fontFamily: "Poppins", fontWeight: 'bold', color: exploreTab === 2 ? '#FFFF' : '#1E5A5A' }} >Learn</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>

                {/* Display news when clicks on news tab */}
                {exploreTab === 0 &&
                    <>
                        {/* News */}
                        <View style={styles.newsContainer}>
                            {/* News Tabs */}
                            <View style={styles.newsTabsContainer}>
                                <View style={styles.innerNewsTabsContainer}>

                                    <Pressable onPress={() => setNewsTabs(0)} style={{ backgroundColor: newsTabs === 0 ? '#FF9900' : '#8B8B8B', display: 'flex', borderRadius: 100, borderWidth: 1, borderColor: '#FFFFFF', alignItems: 'center', paddingVertical: 4, paddingHorizontal: 12 }}>
                                        <Text style={{ fontSize: 12, fontFamily: "Poppins", fontWeight: newsTabs === 0 ? '700' : '400', color: '#FFFFFF' }}>All</Text>
                                    </Pressable>
                                    <Pressable onPress={() => setNewsTabs(1)} style={{ backgroundColor: newsTabs === 1 ? '#FF9900' : '#8B8B8B', display: 'flex', borderRadius: 100, borderWidth: 1, borderColor: '#FFFFFF', alignItems: 'center', paddingVertical: 4, paddingHorizontal: 12 }}>
                                        <Text style={{ fontSize: 12, fontFamily: "Poppins", fontWeight: newsTabs === 1 ? '700' : '400', color: '#FFFFFF' }}>BTC</Text>
                                    </Pressable>
                                    <Pressable onPress={() => setNewsTabs(2)} style={{ backgroundColor: newsTabs === 2 ? '#FF9900' : '#8B8B8B', display: 'flex', borderRadius: 100, borderWidth: 1, borderColor: '#FFFFFF', alignItems: 'center', paddingVertical: 4, paddingHorizontal: 12 }}>
                                        <Text style={{ fontSize: 12, fontFamily: "Poppins", fontWeight: newsTabs === 2 ? '700' : '400', color: '#FFFFFF' }}>ETH</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>

                        {/* Top News */}
                        {newsTabs === 0 &&
                            // Top News
                            <View style={styles.topNewsContainer}>
                                <FlatList
                                    keyExtractor={item => item.id}
                                    refreshControl={
                                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                    }
                                    data={topNews}
                                    renderItem=
                                    {({ item }) => (
                                        <NewsCard
                                            item={item}
                                        />
                                    )}
                                />
                            </View>
                        }
                        {/* Top BTC */}
                        {newsTabs === 1 &&
                            <View style={styles.topNewsContainer}>
                                <FlatList
                                    keyExtractor={item => item.id}
                                    refreshControl={
                                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                    }
                                    data={topBTCNews}
                                    renderItem=
                                    {({ item }) => (
                                        <NewsCard
                                            item={item}
                                        />
                                    )}
                                />
                            </View>
                        }
                        {/* Top ETH */}
                        {newsTabs === 2 &&
                            <View style={styles.topNewsContainer}>
                                <FlatList
                                    keyExtractor={item => item.id}
                                    refreshControl={
                                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                    }
                                    data={topETHNews}
                                    renderItem=
                                    {({ item }) => (
                                        <NewsCard
                                            item={item}
                                        />
                                    )}
                                />
                            </View>
                        }

                    </>
                }
                {exploreTab === 1 &&
                    <>
                        <View style={styles.upgradePlanContainer}>
                            <View style={styles.upgradePlan}>
                                <Text style={styles.textUpgrade}>
                                    Upgrade your plan to access
                                    latest Market Updates
                                </Text>
                                <Image
                                    style={{ width: 43, height: 50 }}
                                    source={require('../../../assets/icons/lock.png')}
                                />
                                <TouchableOpacity style={styles.buttonUpgrade} onPress={() => navigation.navigate('Subscription')}>
                                    <Text style={styles.upgradeButton}>Upgrade Plan</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                }
                {exploreTab === 2 &&
                    <>
                    </>
                }

            </ScrollView>
        </View >
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        backgroundColor: appStyles.color.background,
        fontFamily: "Poppins",
    },
    searchImage: {
        width: 20,
        height: 20,
    },
    carouselContainer: {
        marginLeft: 10,
        marginRight: 70,
        display: 'flex',
        flexDirection: 'column',
    },
    tabsContainer: {
        marginLeft: 14,
        marginRight: 70,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    newsContainer: {
        marginTop: 16,
        marginBottom: 6,
        marginLeft: 10,
        marginRight: 70,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    topNewsContainer: {
        marginRight: 60,
    },
    innerTabContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 7,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    newsTabsContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    innerNewsTabsContainer: {
        width: '100%',
        flexDirection: 'row',
        gap: 12,
    },
    exploreSkeleton: {
        display: 'flex',
        height: 125,
        width: "100%",
        flexDirection: 'row',
        backgroundColor: appStyles.color.background,
    },
    upgradePlanContainer: {

        marginVertical: 100,
        marginLeft: 10,
        marginRight: 70,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    upgradePlan: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textUpgrade: {
        fontFamily: "Poppins",
        color: '#FF9900',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 16,
        maxWidth: 150,
    },
    buttonUpgrade: {
        paddingHorizontal: 18,
        paddingVertical: 12,
        backgroundColor: appStyles.color.buttonBackgroundColor,
        borderRadius: 7,
        marginTop: 22
    },
    upgradeButton: {
        color: appStyles.color.font,
        fontSize: 16,
        fontWeight: '600'
    }
})
