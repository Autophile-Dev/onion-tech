import { StyleSheet, View, FlatList, Image, SafeAreaView, ScrollView, StatusBar, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import appStyles from '../../utils/appStyles';
import { Box, HStack, Text, Pressable, Center, Button } from "native-base";
import History_card from '../../components/history_card'
export default function Premium_history({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // coin_fetch()
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    }, []);
    const [alldata, setAlldata] = useState([
        { "id": 1, }
    ]);
    return (
        <View style={styles.screen}>

            <Text style={styles.title}>
                My Plan
            </Text>
            <Text style={styles.paragraph}>
                You’re currently a <Text style={styles.text_gold}>Premium Subscriber </Text>
                Your subscription will expire on December 31, 2099.
            </Text>
            <Text style={styles.title}>
                Subscription History
            </Text>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{
                }}
                    showsVerticalScrollIndicator={false}
                >
                    <FlatList
                        // keyExtractor={(item) => item.CoinInfo.id}
                        data={alldata}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        renderItem={({ item }) => (
                            <History_card
                                item={item}
                            />
                        )}
                    />


                </ScrollView>
            </SafeAreaView>

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: appStyles.color.background,
        fontFamily: "Poppins",
    },
    title: {
        color: appStyles.color.font,
        margin: 10,
        fontSize: 18,
        fontWeight: 'bold',
        padding: 1
    },
    paragraph: {
        color: appStyles.color.font,
        margin: 10,
        fontSize: 16,
        padding: 1
    },
    text_gold: {
        color: '#FF9900',
        fontSize: 16,
    },
})