import { StyleSheet, View, ImageBackground, Image, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import appStyles from '../../utils//appStyles';
import { Box, HStack, Text, Pressable, Center, Button } from "native-base";
import ProfileHeader from '../../components/profileHeader';
export default function Subscription({ navigation }) {
    return (
        <View style={styles.screen}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 10 }}>
                    <ProfileHeader />
                </View>
                <View style={styles.headText}>
                    <Text style={styles.newsText} >Subscription </Text>
                </View>
                <ScrollView style={{

                }}
                    showsVerticalScrollIndicator={false}
                >
                    <HStack space={3} justifyContent="center" >
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={200}
                            decelerationRate="fast"
                        >

                            <Pressable maxW="400" maxH="400" style={{ marginLeft: 10 }} onPress={() => {
                                console.log('you press')
                            }} >
                                {({
                                    isPressed
                                }) => {
                                    return <Box bg={'#ffff'} style={{

                                        marginRight: 10,

                                        transform: [{
                                            scale: isPressed ? 0.96 : 1
                                        }]
                                    }} p="1" rounded="15" borderWidth="0" borderColor='transparent'>

                                        <Text style={{
                                            fontSize: 20,
                                            fontFamily: "Poppins",
                                            color: '#1C4C4C',
                                            marginLeft: 10,
                                            marginTop: 10
                                        }}>Monthly</Text>
                                        <Text
                                            style={{
                                                fontSize: 40,
                                                fontWeight: '700',
                                                fontFamily: "Poppins",
                                                color: '#1C4C4C',
                                                marginLeft: 10,
                                                paddingTop: 34
                                            }}>$ 9.99/<Text
                                                style={{
                                                    fontSize: 12,
                                                    fontFamily: "Poppins",
                                                    color: '#7A7A7A',
                                                    marginLeft: 10,
                                                    marginTop: 10
                                                }}
                                            >
                                                month
                                            </Text></Text>
                                        <Text style={{
                                            fontSize: 11,

                                            fontFamily: "Poppins",
                                            color: '#1C4C4C',
                                            marginLeft: 10,
                                            marginTop: 10,
                                            marginRight: 25
                                        }}>Renews automatically on monthly basis</Text>
                                        <Button bgColor={"#1C4C4C"} style={{ marginTop: 10, borderRadius: 10, width: 260 }}><Text
                                            style={{
                                                fontSize: 20,
                                                fontWeight: '800',
                                                fontFamily: "Poppins",
                                                color: '#ffff',

                                            }}>SUBSCRIBE</Text></Button>
                                    </Box>;
                                }}
                            </Pressable>
                            <Pressable maxW="96" maxH="96" height={180} onPress={() => {
                                console.log('you press')
                            }} >
                                {({
                                    isPressed
                                }) => {
                                    return <Box bg={'#ffff'} style={{
                                        marginLeft: 10,
                                        marginRight: 10,

                                        transform: [{
                                            scale: isPressed ? 0.96 : 1
                                        }]
                                    }} p="1" rounded="15" borderWidth="0" borderColor='transparent'>

                                        <Text style={{
                                            fontSize: 20,
                                            fontFamily: "Poppins",
                                            color: '#1C4C4C',
                                            marginLeft: 10,
                                            marginTop: 10
                                        }}>Quarterly</Text>
                                        <Text
                                            style={{
                                                fontSize: 40,
                                                fontWeight: '700',
                                                fontFamily: "Poppins",
                                                color: '#1C4C4C',
                                                marginLeft: 10,
                                                paddingTop: 34
                                            }}>$ 99.99/<Text
                                                style={{
                                                    fontSize: 12,
                                                    fontFamily: "Poppins",
                                                    color: '#7A7A7A',
                                                    marginLeft: 10,
                                                    marginTop: 10
                                                }}
                                            >
                                                month
                                            </Text></Text>
                                        <Text style={{
                                            fontSize: 11,

                                            fontFamily: "Poppins",
                                            color: '#1C4C4C',
                                            marginLeft: 10,
                                            marginTop: 10,
                                            marginRight: 25
                                        }}>Renews automatically on monthly basis</Text>
                                        <Button bgColor={"#1C4C4C"} style={{ marginTop: 10, borderRadius: 10, width: 260 }}><Text
                                            style={{
                                                fontSize: 20,
                                                fontWeight: '800',
                                                fontFamily: "Poppins",
                                                color: '#ffff',

                                            }}>SUBSCRIBE</Text></Button>
                                    </Box>;
                                }}
                            </Pressable>
                            <Pressable maxW="96" maxH="96" height={180} onPress={() => {
                                console.log('you press')
                            }} >
                                {({
                                    isPressed
                                }) => {
                                    return <Box bg={'#ffff'} style={{
                                        marginLeft: 10,
                                        marginRight: 10,

                                        transform: [{
                                            scale: isPressed ? 0.96 : 1
                                        }]
                                    }} p="1" rounded="15" borderWidth="0" borderColor='transparent'>

                                        <Text style={{
                                            fontSize: 20,
                                            fontFamily: "Poppins",
                                            color: '#1C4C4C',
                                            marginLeft: 10,
                                            marginTop: 10
                                        }}>Yearly</Text>
                                        <Text
                                            style={{
                                                fontSize: 40,
                                                fontWeight: '700',
                                                fontFamily: "Poppins",
                                                color: '#1C4C4C',
                                                marginLeft: 10,
                                                paddingTop: 34
                                            }}>$ 999.99/<Text
                                                style={{
                                                    fontSize: 12,
                                                    fontFamily: "Poppins",
                                                    color: '#7A7A7A',
                                                    marginLeft: 10,
                                                    marginTop: 10
                                                }}
                                            >
                                                month
                                            </Text></Text>
                                        <Text style={{
                                            fontSize: 11,
                                            fontFamily: "Poppins",
                                            color: '#1C4C4C',
                                            marginLeft: 10,
                                            marginTop: 10,
                                            marginRight: 25
                                        }}>Renews automatically on monthly basis</Text>
                                        <Button bgColor={"#1C4C4C"} style={{ marginTop: 10, borderRadius: 10, width: 260 }}><Text
                                            style={{
                                                fontSize: 20,
                                                fontWeight: '800',
                                                fontFamily: "Poppins",
                                                color: '#ffff',

                                            }}>SUBSCRIBE</Text></Button>
                                    </Box>;
                                }}
                            </Pressable>

                        </ScrollView>


                    </HStack>

                    <View style={{ marginTop: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10, alignItems: 'center' }}>
                            <Image
                                style={{ width: 18, height: 20, marginLeft: 20 }}
                                source={require('../../assets/icons/support.png')}
                            />
                            <Text style={{
                                fontSize: 16,
                                fontFamily: "Poppins",
                                color: '#fff',
                                marginLeft: 10,
                            }}>Priority Support</Text>

                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10, alignItems: 'center' }}>
                            <Image
                                style={{ width: 18, height: 20, marginLeft: 20 }}
                                source={require('../../assets/icons/subscription_signals.png')}
                            />
                            <Text style={{
                                fontSize: 16,
                                fontFamily: "Poppins",
                                color: '#fff',
                                marginLeft: 10,
                            }}>Get Premium Trading Signals</Text>

                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10, alignItems: 'center' }}>
                            <Image
                                style={{ width: 18, height: 20, marginLeft: 20 }}
                                source={require('../../assets/icons/notification.png')}
                            />
                            <Text style={{
                                fontSize: 16,
                                fontFamily: "Poppins",
                                color: '#fff',
                                marginLeft: 10,
                            }}>Priority Notification</Text>

                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10, marginBottom: 10, alignItems: 'center' }}>
                            <Image
                                style={{ width: 18, height: 20, marginLeft: 20 }}
                                source={require('../../assets/icons/subscription_market.png')}
                            />
                            <Text style={{
                                fontSize: 16,
                                fontFamily: "Poppins",
                                color: '#fff',
                                marginLeft: 10,
                            }}>Market Analysis</Text>

                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <View style={{ height: 100, alignItems: 'center' }}>
                <Pressable onPress={() => navigation.navigate('Payment_via_crypto')}><Text style={{
                    fontSize: 12,
                    fontFamily: "Poppins",
                    color: '#FF9900',
                    marginLeft: 10,
                    marginTop: 10,
                    textDecorationLine: 'underline',
                }}>Want to pay via crypto?</Text></Pressable>
                <Text style={{
                    fontSize: 12,

                    fontFamily: "Poppins",
                    color: '#FF9900',
                    marginLeft: 10,
                    textDecorationLine: 'underline',
                }}>Terms and Conditions | EULA</Text>
            </View>
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

    newsText: {
        marginLeft: 5,
        color: appStyles.color.font,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
    },
    headText: {
        backgroundColor: appStyles.color.background,
        marginVertical: 22,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
        justifyContent: 'start',
    }
})