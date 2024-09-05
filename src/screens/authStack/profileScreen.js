import { StyleSheet, View, ImageBackground, Image, SafeAreaView, ScrollView, StatusBar, Switch, Share } from 'react-native'
import React, { useState, useEffect } from 'react';
import appStyles from '../../utils//appStyles';
import { Box, HStack, Text, Pressable, Spacer, VStack, Center, Modal, FormControl, Input, Button } from "native-base";
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ProfileHeader from '../../components/profileHeader';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState("");
    const [modalVisible, setModalVisible] = React.useState(false);

    const [isSignal, setIsSignal] = useState(true);
    const [isNews, setIsNews] = useState(true);
    const [isOther, setIsOther] = useState(true);


    const SignalSwitch = async () => { setIsSignal(previousState => !previousState); await AsyncStorage.setItem("isSignal", toString(isSignal)) };
    const NewsSwitch = async () => { setIsNews(previousState => !previousState); await AsyncStorage.setItem("isNews", toString(isNews)) };
    const OtherSwitch = async () => { setIsOther(previousState => !previousState); await AsyncStorage.setItem("isOther", toString(isOther)) };
    const shareContent = async () => {
        try {
            const result = await Share.share({
                message: 'Check out this cool app!',
                url: 'https://play.google.com/store/apps/details?id=com.onion.android',
                title: 'Onion Crypto',
            });
            if (result.action === Share.sharedAction) {
                console.log('Shared successfully');
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const openLink = async (item_url) => {
        console.log(item_url)
        openLink = WebBrowser.openBrowserAsync(item_url)
    }
    const load_data = async () => {
        try {
            let userid = await AsyncStorage.getItem("userid")
            let username = await AsyncStorage.getItem("username")
            let access = await AsyncStorage.getItem("access")
            let refresh = await AsyncStorage.getItem("refresh")
            setUsername(username)
        } catch (err) {
            alert("error", err)
        }
    }
    useEffect(() => {
        load_data()

    }, [])

    return (
        <View style={styles.screen}>
            {/* <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard justifyContent="center" bottom="4" size="lg">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Enter Reedem Code</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Code:</FormControl.Label>
              <Input />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button flex="1" onPress={() => {
              setModalVisible(false);
            }}>
              Proceed
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal> */}
            <View style={{ paddingHorizontal: 10 }}>
                <ProfileHeader />
            </View>

            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{
                    marginHorizontal: 10,
                }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.headText}>
                        <Text style={styles.newsText} >Profile & Settings </Text>
                    </View>
                    <Pressable maxW="96" maxH="96" style={styles.press} key="1">
                        {({
                            isHovered,
                            isFocused,
                            isPressed
                        }) => {
                            return <Box bg={isPressed ? navigation.navigate('ProfileScreen_edit') : isHovered ? "coolGray.200" : '#ffff'} style={{
                                marginLeft: 10,
                                marginRight: 10,
                                marginTop: 10,
                                transform: [{
                                    scale: isPressed ? 0.96 : 1
                                }],
                                shadowColor: "#F4B41A",
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowOpacity: 1.8,
                                shadowRadius: 15,
                                elevation: 12,
                            }} p="1" rounded="15">
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10, marginBottom: 10 }}>
                                    <View>
                                        <Image
                                            style={{ width: 72, height: 72, marginLeft: 20 }}
                                            source={require('../../assets/icons/furqan_logo.png')}
                                        />
                                    </View>
                                    <View style={{ marginLeft: 20 }}>
                                        <Image
                                            style={{ width: 25, height: 25 }}
                                            source={require('../../assets/icons/crown.png')}
                                        />
                                        <Text style={{
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                            fontFamily: "Poppins",
                                            color: '#1C4C4C',
                                            marginRight: 10,
                                        }}>{username}</Text>
                                        <Text style={{
                                            fontSize: 11,
                                            fontFamily: "Poppins",
                                            color: '#1C4C4C',
                                            marginRight: 10,
                                        }}>User@onioncrypto.com</Text>
                                    </View>
                                </View>




                            </Box>;
                        }}
                    </Pressable>

                    <Text style={{
                        fontSize: 11,
                        fontFamily: "Poppins",
                        color: '#fff',
                        marginLeft: 10,
                        marginVertical: 15

                    }}>SUBSCRIPTION</Text>

                    <View style={{ backgroundColor: "#1E5A5A", borderRadius: 15, marginLeft: 10, marginRight: 10 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 14, marginRight: 10 }}>
                            <View>
                                <Text style={{
                                    fontSize: 14,
                                    fontFamily: "Poppins",
                                    color: '#fff',
                                    marginLeft: 20,
                                    fontWeight: '700',

                                }}>My Plan</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                <Image
                                    style={{ width: 12, height: 10, marginRight: 5 }}
                                    source={require('../../assets/icons/crown.png')}
                                />
                                <Text style={{ color: '#F4B41A', fontSize: 12, fontWeight: '700' }}>VIP member</Text>
                            </View>
                        </View>
                        <View
                            style={{

                                borderBottomColor: '#277676',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />
                        <Pressable style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}
                            onPress={() => navigation.navigate('Subscription')}
                        >
                            <Image
                                style={{ width: 15, height: 15, marginLeft: 20 }}
                                source={require('../../assets/icons/view_plan.png')}
                            />
                            <Text style={{
                                fontSize: 14,
                                fontFamily: "Poppins",
                                color: '#FF9900',
                                marginLeft: 10,
                                fontWeight: '700',
                            }}>View Plan</Text>

                        </Pressable>
                        <View
                            style={{
                                borderBottomColor: '#277676',
                                borderBottomWidth: StyleSheet.hairlineWidth,

                            }}
                        />
                        <Pressable style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Image
                                style={{ width: 15, height: 15, marginLeft: 20 }}
                                source={require('../../assets/icons/reedem_code.png')}
                            />
                            <Text style={{
                                fontSize: 14,
                                fontFamily: "Poppins",
                                color: '#fff',
                                marginLeft: 10,
                                fontWeight: '700',
                            }}>Redeem Code</Text>
                        </Pressable>
                        <View
                            style={{
                                borderBottomColor: '#277676',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />
                        <Pressable style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}
                            // onPress={ ()=> navigation.navigate('Premium_history')}
                            onPress={() => navigation.navigate('Free_User_history')}
                        >
                            <Image
                                style={{ width: 17, height: 15, marginLeft: 20 }}
                                source={require('../../assets/icons/history.png')}
                            />
                            <Text style={{
                                fontSize: 14,
                                fontFamily: "Poppins",
                                color: '#fff',
                                marginLeft: 10,
                                fontWeight: '700',
                            }}>Subscription History</Text>

                        </Pressable>
                    </View>

                    <Text style={{
                        fontSize: 11,
                        fontFamily: "Poppins",
                        color: '#fff',
                        marginLeft: 10,
                        marginVertical: 15
                    }}>NOTIFICATIONS</Text>

                    <View style={{ backgroundColor: "#1E5A5A", borderRadius: 15, marginLeft: 10, marginRight: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, marginHorizontal: 10, alignItems: 'center', }}>
                            <View>
                                <Text style={{
                                    fontSize: 14,
                                    fontFamily: "Poppins",
                                    color: '#fff',
                                    marginLeft: 10,
                                    fontWeight: '700',
                                }}>Signals</Text>
                            </View>
                            <View>
                                <Switch
                                    style={{ height: 20, marginRight: 5 }}
                                    trackColor={{ false: "#0F4444", true: "#3CBEBE" }}
                                    thumbColor={isSignal ? "#ffff" : "#ffff"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={SignalSwitch}
                                    value={isSignal}
                                />
                            </View>
                        </View>
                        <View
                            style={{
                                borderBottomColor: '#277676',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, marginHorizontal: 10, alignItems: 'center', }}>
                            <View>
                                <Text style={{
                                    fontSize: 14,
                                    fontFamily: "Poppins",
                                    color: '#fff',
                                    marginLeft: 10,
                                    fontWeight: '700',
                                }}>News</Text>
                            </View>
                            <View>
                                <Switch
                                    style={{ height: 20, marginRight: 5 }}
                                    trackColor={{ false: "#0F4444", true: "#3CBEBE" }}
                                    thumbColor={isNews ? "#ffff" : "#ffff"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={NewsSwitch}
                                    value={isNews}
                                />
                            </View>
                        </View>
                        <View
                            style={{
                                borderBottomColor: '#277676',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, marginHorizontal: 10, alignItems: 'center', }}>
                            <View>
                                <Text style={{
                                    fontSize: 14,
                                    fontFamily: "Poppins",
                                    color: '#fff',
                                    fontWeight: '700',
                                    marginLeft: 10,
                                }}>Other Alerts</Text>
                            </View>
                            <View>
                                <Switch
                                    style={{ height: 20, marginRight: 5 }}
                                    trackColor={{ false: "#0F4444", true: "#3CBEBE" }}
                                    thumbColor={isOther ? "#ffff" : "#ffff"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={OtherSwitch}
                                    value={isOther}
                                />
                            </View>
                        </View>


                    </View>
                    <Text style={{
                        fontSize: 11,
                        fontFamily: "Poppins",
                        color: '#fff',
                        marginLeft: 10,
                        marginVertical: 15
                    }}>JOIN OUR COMMUNITY</Text>

                    <View style={{ backgroundColor: "#1E5A5A", borderRadius: 15, marginLeft: 10, marginRight: 10 }}>


                        <Pressable style={{ flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 10, alignItems: 'center', }}
                            onPress={() => {
                                return (
                                    openLink("https://t.me/onioncrypto")
                                )
                            }}
                        >
                            <Image
                                style={{ width: 15, height: 15, marginLeft: 20 }}
                                source={require('../../assets/icons/logos_telegram.png')}
                            />
                            <Text style={{
                                fontSize: 14,
                                fontFamily: "Poppins",
                                color: '#fff',
                                fontWeight: '700',
                                marginLeft: 10,
                            }}>Telegram</Text>

                        </Pressable>
                        <View
                            style={{
                                borderBottomColor: '#277676',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />
                        <Pressable style={{ flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 10, alignItems: 'center' }}
                            onPress={() => {
                                return (
                                    openLink("https://discord.gg/QEsuGuQF2S")
                                )
                            }}
                        >
                            <Image
                                style={{ width: 15, height: 15, marginLeft: 20 }}
                                source={require('../../assets/icons/logos_discord.png')}
                            />
                            <Text style={{
                                fontSize: 14,
                                fontFamily: "Poppins",
                                color: '#fff',
                                fontWeight: '700',
                                marginLeft: 10,
                            }}>Discord</Text>

                        </Pressable>

                    </View>
                    <Text style={{
                        fontSize: 11,
                        fontFamily: "Poppins",
                        color: '#fff',
                        marginLeft: 10,
                        marginVertical: 15
                    }}>FOLLOW US</Text>

                    <View style={{ backgroundColor: "#1E5A5A", borderRadius: 15, marginLeft: 10, marginRight: 10 }}>

                        <Pressable style={{ flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 10, alignItems: 'center' }}
                            onPress={() => {
                                return (
                                    openLink("https://www.facebook.com/onioncrypto")
                                )
                            }}
                        >
                            <Image
                                style={{ width: 15, height: 15, marginLeft: 20 }}
                                source={require('../../assets/icons/logos_facebook.png')}
                            />
                            <Text style={{
                                fontSize: 14,
                                fontFamily: "Poppins",
                                color: '#fff',
                                fontWeight: '700',
                                marginLeft: 10,
                            }}>FaceBook</Text>

                        </Pressable>
                        <View
                            style={{
                                borderBottomColor: '#277676',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />
                        <Pressable style={{ flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 10, alignItems: 'center' }}
                            onPress={() => {
                                return (
                                    openLink("https://instagram.com/ocs.app")
                                )
                            }}>
                            <Image
                                style={{ width: 15, height: 15, marginLeft: 20 }}
                                source={require('../../assets/icons/logos_instagram.png')}
                            />
                            <Text style={{
                                fontSize: 14,
                                fontFamily: "Poppins",
                                color: '#fff',
                                marginLeft: 10,
                                fontWeight: '700',
                            }}>Instagram</Text>

                        </Pressable>
                        <View
                            style={{
                                borderBottomColor: '#277676',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />
                        <Pressable style={{ flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 10, alignItems: 'center' }}
                            onPress={() => {
                                return (
                                    openLink("https://twitter.com/ocsapp")
                                )
                            }}
                        >
                            <Image
                                style={{ width: 15, height: 15, marginLeft: 20 }}
                                source={require('../../assets/icons/logos_twitter.png')}
                            />
                            <Text style={{
                                fontSize: 14,
                                fontFamily: "Poppins",
                                color: '#fff',
                                fontWeight: '700',
                                marginLeft: 10,
                            }}>Twitter</Text>

                        </Pressable>
                        <View
                            style={{
                                borderBottomColor: '#277676',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />
                        <Pressable style={{ flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 10, alignItems: 'center' }}
                            onPress={shareContent}
                        >
                            <Image
                                style={{ width: 15, height: 15, marginLeft: 20 }}
                                source={require('../../assets/icons/logos_share.png')}
                            />
                            <Text style={{
                                fontSize: 14,
                                fontFamily: "Poppins",
                                color: '#fff',
                                marginLeft: 10,
                                fontWeight: '700',
                            }}>Share</Text>

                        </Pressable>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Image
                            style={{ width: 25, height: 25 }}
                            source={require('../../assets/icons/onion_logo.png')}
                        />

                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: "Poppins",
                                color: '#fff',
                                marginTop: 10
                            }}
                        >© 2023 All Rights Reserved | Onion Technologies</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
export default ProfileScreen;
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

        alignSelf: 'flex-start',
        justifyContent: 'start',
    }
})