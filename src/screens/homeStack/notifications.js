import { StyleSheet, View, Pressable, Image, SafeAreaView, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import appStyles from '../../utils//appStyles';
import { Box, FlatList, Heading, Avatar, HStack, VStack, Text, Spacer, Center } from "native-base";
import moment from 'moment';
import SignalsAPI from '../../services/signalsAPI'
export default function Notifications({ navigation }) {
    const [data, setAlldata] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    console.log("alldata", data)
    const notification_fetch = async () => {
        const res = await SignalsAPI.notifications()
        console.log("res.data", res.data)
        if (res.status = 200) {
            setAlldata(res.data.data)
        }
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        notification_fetch()
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    }, []);

    useEffect(() => {
        notification_fetch()
    }, [])
    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView style={{
                marginHorizontal: 10,
            }}
                showsVerticalScrollIndicator={false}
            >

                <FlatList data={data}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    renderItem=
                    {({
                        item
                    }) =>
                        <Pressable borderBottomWidth="1" _dark={{
                            borderColor: "muted.50"
                        }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2" onPress={() => {
                            return (
                                navigation.navigate('BottomBar')
                            )
                        }}>
                            <HStack space={[2, 3]} justifyContent="space-between">
                                {/* <Avatar size="48px" style={{backgroundColor:'#ffff'}} source={require('../../assets/icons/login_logo_onion.png')} />
              */}
                                <VStack>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text _dark={{
                                            color: "#ffff"
                                        }} color="#FF9900" bold>
                                            {item.Title}
                                        </Text>
                                        <Text fontSize="xs" _dark={{
                                            color: "#ffff"
                                        }} color="#FF9900" alignSelf="flex-start">
                                            {moment(item.updated_at).fromNow()}
                                        </Text>
                                    </View>
                                    <Text color="#ffff" >
                                        {item.Message}
                                    </Text>
                                </VStack>

                                <Spacer />
                            </HStack>
                        </Pressable>
                    }
                />


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
    text: {
        color: appStyles.color.font,
        padding: 1
    },
})