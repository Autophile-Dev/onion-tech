import { StyleSheet, View, Image, SafeAreaView, ScrollView, RefreshControl, Dimensions } from 'react-native'
import { Box, FlatList, Text, Center, Pressable } from "native-base";
import React, { useState, useEffect } from 'react';
import BottmbarHead from '../../../container/BottmbarHead';
import appStyles from '../../../utils/appStyles';
// import NewsAPI from '../../../services/newsAPI'
import NewsAPI from '../../../services/newsAPI'
import NewsCard from '../../../components/newsCard.js';

const Head = () => (
    <View style={styles.headText}>
        <Text style={styles.newstext} >News </Text>
    </View>
)



export default function News() {
    const [refreshing, setRefreshing] = React.useState(false);
    const [alldata, setAlldata] = useState([""]);
    const [loading, setLoading] = useState(true);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        news_fetch()
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        news_fetch()
    }, []);


    const news_fetch = async () => {
        setLoading(true);
        const res = await NewsAPI.latest_news()
        const filteredData = res?.data?.Data.filter(item => item?.source_info?.name !== "CoinGape");
        // console.log(filteredData);
        setAlldata(filteredData)
        setLoading(false);
    }

    return (
        <SafeAreaView style={styles.screen} >
            <View style={{ paddingHorizontal: 10 }}>
                <BottmbarHead />
            </View>
            <ScrollView style={{ flexGrow: 1, width: Dimensions.get('screen').width + 40 }}>
                <View style={{ marginTop: 24, marginBottom: 15, marginHorizontal: 10, }}>
                    <Head />
                </View>
                <View style={{ marginBottom: 163, paddingRight: 60, width: Dimensions.get('window').width + 40 }}>
                    <FlatList
                        keyExtractor={item => item.id}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        data={alldata}
                        renderItem=
                        {({ item }) => (
                            <NewsCard
                                item={item}
                            />
                        )}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        backgroundColor: appStyles.color.background,
        fontFamily: "Poppins",
    },
    newstext: {
        marginLeft: 5,
        color: appStyles.color.font,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
    },
    headText: {
        backgroundColor: appStyles.color.background,
        marginTop: 0,
        marginBottom: 0,
        alignSelf: 'flex-start',
        justifyContent: 'start',
    }
})