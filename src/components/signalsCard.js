import { StyleSheet, Text, View, ImageBackground, Image, Dimensions } from 'react-native'
import { Box, HStack, Pressable, Spacer, Button } from "native-base";
import React from 'react'
import { useSelector } from "react-redux";
import { deleteTask } from "../../src/redux/TaskSlice";
import { useDispatch } from "react-redux";
import moment from 'moment';
import appStyles from '../utils/appStyles';

function timeSince(unixTimestamp) {
    // var date_timestamp = new Date(unixTimestamp * 1000);
    var today = new Date();
    var time_diff = (today - unixTimestamp) / 1000
    var aDay = time_diff * 1000
    var date = new Date(Date.now() - aDay)

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}
export default function SignalsCard({ item }) {
    const deviceWidth = Dimensions.get('window').width;
    const price = item.get_pair_price
    var tp1_rise = price ? 100 - (item.tp1 / item.get_pair_price) * 100 : 1
    var tp2_rise = price ? 100 - (item.tp2 / item.get_pair_price) * 100 : 1
    var tp3_rise = price ? 100 - (item.tp3 / item.get_pair_price) * 100 : 1
    // console.log("deviceWidth++", deviceWidth)

    const [is_premium, setIs_premium] = React.useState(true);

    const dispatch = useDispatch();
    const coindetail = useSelector((state) => state.coininfo);

    const onDelete = (id) => {
        dispatch(
            deleteTask({
                id: id,
            })
        );
    };
    const openLink = async (item_url) => {
        // openLink = WebBrowser.openBrowserAsync(item_url)
        // console.log("you press signal card")
    }
    return (
        <Pressable style={styles.press} onPress={() => {
            return (
                openLink(item.signal_type)
            )
        }} >
            {({
                isHovered,
                isPressed
            }) => {
                return <Box bg={isPressed ? 'transparent' : isHovered ? "coolGray.200" : 'transparent'} style={{
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 10,
                    backgroundColor: '#113838',
                    width: '100%',
                    borderRadius: 15,
                    overflow: 'hidden',
                    transform: [{
                        scale: isPressed ? 0.96 : 1
                    }],

                }} rounded="15" borderWidth="0" borderColor='transparent'>


                    <View style={styles.chart}>
                        <Image source={item.stopLoss_hit === true ? require('../assets/icons/graph_low.png') : require('../assets/icons/graph.png')} resizeMode="cover" borderRadius={15} style={{
                            opacity: 1, width: '100%',
                            height: '100%',
                            resizeMode: 'cover',
                        }}
                        />
                    </View>
                    <HStack alignItems="center" style={{ marginTop: 10, marginBottom: 5 }}>
                        {/* <Image
              style={{ width: 10, height: 10, marginLeft: 10 }}
              source={require('../assets/icons/long_icon.png')}
            /> */}
                        <View style={item.type === 'Long' ? styles.long : styles.short}>
                            {item.type === 'Long' ? <Text style={styles.typeText}>L</Text> : <Text style={styles.typeText}>S</Text>}
                        </View>
                        {is_premium ?
                            <Text
                                style={{
                                    font: '#fff',
                                    fontSize: 11,
                                    fontFamily: "Poppins",
                                    color: '#fff',
                                    marginLeft: 3,

                                }} >
                                Direction: {item.type}
                            </Text>
                            : <View>
                                <Text style={{ marginLeft: 5, font: '#fff', fontSize: 11, fontFamily: "Poppins", color: '#FF9900', }}>
                                    Upgrade your plan to unlock
                                </Text>
                            </View>}
                        <Spacer />
                        <View style={{
                            backgroundColor: item.signal_status == "active" ? "#1E953F" : '#A3A3A3',
                            width: 50,
                            height: 20,
                            borderRadius: 15,
                            borderWidth: 1,
                            borderColor: '#fff',
                            borderStyle: 'solid',
                            marginRight: 10,
                            justifyContent: 'center'
                        }}>
                            <Text style={{ fontFamily: "Poppins", font: '#fff', fontSize: 11, textAlign: 'center', color: '#fff' }}>• Active</Text></View>

                    </HStack>
                    {/* next h stack */}
                    <HStack alignItems="center" style={{ marginTop: 10, marginBottom: 5 }}>
                        <View style={styles.signalInner}>
                            <View style={styles.coinDetailInner}>
                                <Image
                                    style={{ width: 24, height: 24, display: 'flex', flexDirection: 'row', alignItems: 'center', }}
                                    source={{ uri: item.get_pair_Image_URL }}
                                />
                                <Text style={{ font: '#fff', fontSize: 20, fontFamily: "Poppins", color: '#fff', marginLeft: 7 }} >
                                    {item.pair}/USD
                                </Text>
                            </View>
                            <View style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                                <View>
                                    <Text style={{ fontFamily: "Poppins", font: '#fff', fontSize: 11, color: '#A3A3A3', fontStyle: 'italic', paddingRight: 6 }}>Current Price</Text>
                                </View>
                                <View>
                                    <Text style={{ fontFamily: "Poppins", font: '#fff', fontSize: 14, color: '#fff', fontWeight: 'bold', fontsize: 15, }}>{item.get_pair_price}</Text>
                                </View>
                                {/* <Text style={{ fontFamily: "Poppins", font: '#fff', fontSize: 11, color: '#F02424', alignContent: 'flex-end' }}> <Image
                  style={{ width: 8, height: 8, marginLeft: 10 }}
                  source={require('../assets/icons/down_price.png')}
                />2.3%</Text> */}
                            </View>
                        </View>
                    </HStack>
                    {/* next h stack */}

                    <HStack alignItems="center" style={{ marginTop: 15, marginBottom: 5 }}>
                        {
                            is_premium ?
                                <View style={styles.buyingZone}>
                                    <View>
                                        <Text style={{ font: '#fff', fontSize: 12, fontFamily: "Poppins", color: '#fff', marginLeft: 10, }} >
                                            Buying Zone
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ font: '#fff', fontSize: 14, fontFamily: "Poppins", color: '#fff', marginLeft: 10, marginTop: 5, fontWeight: 'bold' }}>{item.buy_range_from} | {item.buy_range_to}</Text>
                                    </View>


                                    <View style={{ display: 'flex', backgroundColor: '#1E953F', borderTopRightRadius: 15, borderBottomRightRadius: 15, marginTop: 8, borderWidth: 1, borderColor: '#257B7B', backgroundColor: item.stopLoss_hit === true ? "#A72424" : '#257B7B', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 4, paddingVertical: 2 }}>
                                        <View><Text style={{ fontFamily: "Poppins", font: '#fff', fontSize: 11, color: '#fff' }}>Stop Loss:</Text></View>
                                        <View>
                                            <Text style={{ fontFamily: "Poppins", font: '#fff', fontSize: 11, color: '#fff' }}>
                                                {item.stopLoss}
                                            </Text>
                                        </View>

                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 5, gap: 4 }}>
                                        <View>
                                            <Image
                                                style={{ width: 11, height: 11 }}
                                                source={require('../../src/assets/icons/time.png')}
                                            />
                                        </View>
                                        <View>
                                            <Text style={{ font: '#fff', fontSize: 11, fontFamily: "Poppins", color: '#fff', fontStyle: 'italic', }} >{moment(item.updated_at).fromNow()}</Text>
                                        </View>
                                    </View>
                                </View>
                                :
                                <View style={{ backgroundColor: '#FF9900', borderTopRightRadius: 10, borderBottomEndRadius: 10, marginRight: 25 }}>
                                    <Text style={{ fontFamily: "Poppins", font: '#fff', fontSize: 14, color: '#fff', marginRight: 10 }}>
                                        Upgrade Plan
                                    </Text>
                                </View>
                        }
                        <Spacer />
                        <View style={{
                            backgroundColor: item.tp1_hit === true ? "green" : '#1E5A5A', width: 70, height: 80, borderRadius: 15, borderWidth: 1, borderColor: '#1E5A5A', marginRight: 5, justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Text style={{ fontFamily: "Poppins", font: '#fff', fontSize: 11, textAlign: 'center', color: '#A3A3A3', marginTop: 5 }}> Target 1
                            </Text>
                            {
                                is_premium ? <View>
                                    <Text style={{ fontFamily: "Poppins", font: '#fff', fontSize: 14, fontWeight: "bold", textAlign: 'center', color: '#fff', marginTop: 5 }}>{item.tp1}</Text>

                                    <Text style={{ fontFamily: "Poppins", font: '#fff', fontSize: 11, color: '#43DE6E', marginTop: 5, marginBottom: 5 }}>
                                        <Image
                                            style={{ width: 8, height: 8, marginLeft: 10 }}
                                            source={require('../assets/icons/up_price.png')}
                                        />
                                        {tp1_rise.toFixed(2)}%</Text>
                                </View>
                                    : <Image
                                        style={{ width: 24, height: 34, marginLeft: 5, marginTop: 10, marginBottom: 10 }}
                                        source={require('../assets/icons/lock.png')}
                                    />
                            }
                        </View>
                        <View style={{
                            backgroundColor: item.tp2_hit === true ? "green" : '#1E5A5A', width: 70, height: 80, borderRadius: 15, borderWidth: 1, borderColor: '#1E5A5A', marginRight: 5, justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Text style={{ fontFamily: "Poppins", font: '#fff', fontSize: 11, textAlign: 'center', color: '#A3A3A3', marginTop: 5 }}> Target 2
                            </Text>
                            {
                                is_premium ? <View>
                                    <Text style={{ fontFamily: "Poppins", font: '#fff', fontSize: 14, fontWeight: "bold", textAlign: 'center', color: '#fff', marginTop: 5 }}>{item.tp2}</Text>

                                    <Text style={{ fontFamily: "Poppins", font: '#fff', fontSize: 11, color: '#43DE6E', marginTop: 5, marginBottom: 5 }}> <Image
                                        style={{ width: 8, height: 8, marginLeft: 10 }}
                                        source={require('../assets/icons/up_price.png')}
                                    />{tp2_rise.toFixed(2)}%</Text>

                                </View>
                                    : <Image
                                        style={{ width: 24, height: 34, marginLeft: 5, marginTop: 10, marginBottom: 10 }}
                                        source={require('../assets/icons/lock.png')}
                                    />
                            }
                        </View>
                        <View style={{
                            backgroundColor: item.tp3_hit === true ? "green" : '#1E5A5A', width: 70, height: 80, borderRadius: 15, borderWidth: 1, borderColor: '#1E5A5A', marginRight: 5, justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Text style={{ fontFamily: "Poppins", font: '#fff', fontSize: 11, textAlign: 'center', color: '#A3A3A3', marginTop: 5 }}> Target 3
                            </Text>
                            {
                                is_premium ? <View>
                                    <Text style={{ fontFamily: "Poppins", font: '#fff', fontSize: 14, fontWeight: "bold", textAlign: 'center', color: '#fff', marginTop: 5 }}>{item.tp3}</Text>

                                    <Text style={{ fontFamily: "Poppins", font: '#fff', fontSize: 11, color: '#43DE6E', marginTop: 5, marginBottom: 5 }}> <Image
                                        style={{ width: 8, height: 8, marginLeft: 10 }}
                                        source={require('../assets/icons/up_price.png')}
                                    />{tp3_rise.toFixed(2)}%</Text>


                                </View>
                                    : <Image
                                        style={{ width: 24, height: 34, marginLeft: 5, marginTop: 10, marginBottom: 10 }}
                                        source={require('../assets/icons/lock.png')}
                                    />
                            }
                        </View>
                    </HStack>
                </Box>;
            }}

        </Pressable>
    )
}

const styles = StyleSheet.create({
    press: {
        paddingRight: 20,
        width: '100%',
    },
    chart: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1, // Ensure the chart is behind the cardHeadContainer
    },
    long: {
        width: 10,
        height: 10,
        backgroundColor: '#43DE6E',
        borderRadius: 2,
        marginLeft: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    short: {
        width: 10,
        height: 10,
        backgroundColor: '#F02424',
        borderRadius: 2,
        marginLeft: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',

    },
    typeText: {
        fontSize: 8,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
    },
    signalInner: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    coinDetailInner: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    }
})