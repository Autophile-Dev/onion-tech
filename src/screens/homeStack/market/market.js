import {
    View,
    Text,
    ScrollView,
    Dimensions,
    SafeAreaView,
    StyleSheet,
    AppState,
    Pressable,
    Image,
    ImageBackground,
    Animated
} from 'react-native'
import BottmbarHead from '../../../container/BottmbarHead';
import React, { useState, useEffect, useRef } from "react";
import { WebView } from 'react-native-webview';
import appStyles from '../../../utils/appStyles';
import { advancedChart, lineChart, headerV3, assetsChartm, coinChart, moreadvancedChart } from './cryptoWidgetScripts'
import { useNavigation } from '@react-navigation/native';
import coin_API from '../../../services/coin_API';
import marketAPI from '../../../services/marketAPI';
import moment from 'moment';
import Svg, { Path, G, Circle, Rect } from 'react-native-svg';


const RoundBox = ({ title, paragraph }) => {
    return (
        <View style={styles.roundBox}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.paragraph}>{paragraph} </Text>
        </View>
    );
};


export default function Market() {
    const now = new Date();
    const formattedDateTime = moment(now).format('HH:mm, MMM D, YYYY');
    const [marketTab, setMarketTab] = useState(true)
    const [greeddata, setGreeddata] = useState(false)
    const [btcdata, setBtcdata] = useState(false)
    const [greed, setGreed] = useState((80 * 2) - 100);
    const navigation = useNavigation();
    const { width } = Dimensions.get('window')
    const addHeightInTop = width <= 375 ? ((375 - width) * 3) + 35 : 0
    const marketCoinName = 'BTC'
    const [lastWeekData, setLastWeekData] = useState(null);
    const [lastMonthData, setLastMonthData] = useState(null);
    const [lastYearData, setLastYearData] = useState(null);

    const greed_data = async () => {
        try {
            const res = await marketAPI.fearAndGreed();
            if (res.status === 200) {
                const greedData = res.data;
                console.log(greedData);

            }
        } catch (err) {
            console.log("greed error", err);
        }
    };

    const btc_price = async () => {
        try {
            const res = await coin_API.btc_data()
            if (res.status == 200) {
                setBtcdata(res.data.DISPLAY)
                console.log("btc_price", res.data.DISPLAY)
            }
        } catch (err) {
            console.log("greed error", err)
        }
    }

    const renderChart = () => {
        return `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Onion</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                </head>
                <body style="margin:0px; padding:0px; background-color: #1C4D4D " >
                    <div style="padding:10px; background-color: #1C4D4D">
                        ${moreadvancedChart(marketCoinName)}
                    </div>
                </body>
            </html>
        `
    }

    const rotateAnim = useRef(new Animated.Value(0)).current;

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 100],
        outputRange: ['0deg', '360deg'],
    });
    useEffect(() => {
        btc_price()
        greed_data()
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 60 / 360,
                duration: 2000,
                useNativeDriver: true,
            })
        ).start();




    }, []);



    return (
        <SafeAreaView style={styles.screen} >
            <View style={{ paddingHorizontal: 10 }}>
                <BottmbarHead />
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1, marginBottom: 60 }}>
                <Text style={{ fontSize: 18, fontFamily: "Poppins", fontWeight: 'bold', color: '#ffff', marginVertical: 22, marginHorizontal: 14, }}>
                    Global Market
                </Text>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#ffff', borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', height: 35, width: 350 }}>
                        <Pressable
                            style={{ backgroundColor: marketTab ? '#FF9900' : '#FFFFFF', alignItems: 'center', flexGrow: 1, borderRadius: 5, }}
                            onPress={() => setMarketTab(true)}>
                            <View>
                                <Text style={{ fontSize: 14, fontFamily: "Poppins", fontWeight: 'bold', color: marketTab ? '#FFFF' : '#1E5A5A', marginTop: 8 }} > Market Stats</Text>
                            </View>
                        </Pressable>
                        <Pressable
                            style={{ backgroundColor: marketTab ? '#FFFF' : '#FF9900', alignItems: 'center', flexGrow: 1, borderRadius: 5, }}
                            onPress={() => setMarketTab(false)}>
                            <View>
                                <Text style={{ fontSize: 14, fontFamily: "Poppins", fontWeight: 'bold', color: marketTab ? '#1E5A5A' : '#ffff', marginTop: 8 }} >Fear & Greed Index</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>

                {
                    marketTab ?
                        <>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.textRowContainer}>
                                    <View style={styles.verticalTextContainer}>
                                        <Text style={styles.darkText}>{btcdata ? btcdata.BTC.USDT.MKTCAP : 0}</Text>
                                        <Text style={styles.lightText}>Market Cap</Text>
                                    </View>
                                    <View style={styles.verticalTextContainer}>
                                        <Text style={styles.darkText}>{btcdata ? btcdata.BTC.USDT.VOLUME24HOUR : 0}</Text>
                                        <Text style={styles.lightText}>24h Volume</Text>
                                    </View>
                                </View>
                                <View style={styles.textRowContainer}>
                                    <View style={styles.verticalTextContainer}>
                                        <Text style={styles.darkText}>{btcdata ? btcdata.BTC.USDT.CIRCULATINGSUPPLY : 0}</Text>
                                        <Text style={styles.lightText}>BTC CIRCULATINGSUPPLY</Text>
                                    </View>
                                    <View style={styles.verticalTextContainer}>
                                        <Text style={styles.darkText}>{btcdata ? btcdata.ETH.USDT.CIRCULATINGSUPPLY : 0}</Text>
                                        <Text style={styles.lightText}>ETH CIRCULATINGSUPPLY</Text>
                                    </View>
                                </View>
                                <View style={[styles.textRowContainer, { borderBottomWidth: 0 }]}>
                                    <View style={styles.verticalTextContainer}>
                                        <Text style={styles.darkText}>{btcdata ? btcdata.BTC.USDT.MKTCAP : 0}</Text>
                                        <Text style={styles.lightText}>BTC Capital</Text>
                                    </View>
                                    <View style={styles.verticalTextContainer}>
                                        <Text style={styles.darkText}>{btcdata ? btcdata.ETH.USDT.MKTCAP : 0}</Text>
                                        <Text style={styles.lightText}>ETH Capital</Text>
                                    </View>
                                </View>
                            </View>
                            <WebView
                                source={{ html: renderChart() }}
                                scrollEnabled={false}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                            />
                        </>


                        :
                        <View style={{}}>
                            {/* fear and greed index tab */}
                            <View style={{ flex: 1, marginTop: 30, alignItems: 'center', justifyContent: 'center', }}>
                                {/* <ImageBackground source={require('../../../assets/icons/Groupdial.png')} resizeMode='contain' style={{ alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Svg width="188" height="100"  >
                      <Path d="M100 20 L100 100 L90 100 L100 20" stroke="#F3F3F3" strokeWidth="5" fill="#CFCFCF" transform={`rotate(${greeddata ? (greeddata['fgi']['now']['value'] * 180) / 100 - 90 : -82}, 100, 100)`} />
                    </Svg>
                    <View style={styles.imageContainer}>
                      <Image
                        source={require('../../../assets/icons/needle_circle.png')}
                        style={styles.image}
                      />
                      <Text style={styles.Image_text}>
                        {greeddata ? greeddata['fgi']['now']['value'] : 0}
                      </Text>
                    </View>
  
  
                  </ImageBackground> */}
                                <Image
                                    source={{ uri: 'https://alternative.me/crypto/fear-and-greed-index.png' }}
                                    style={{ alignItems: 'center', justifyContent: 'center', width: 282, height: 188, borderRadius: 8 }}
                                />
                            </View>

                            <View style={styles.logDataContainer}>
                                <View style={styles.logContainer}>
                                    <View>
                                        <Text style={styles.logHead}>Last Week{'\n'}Index</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.logData}>{lastWeekData}</Text>
                                    </View>
                                </View>
                                <View style={styles.logContainer}>
                                    <View>
                                        <Text style={styles.logHead}>Last Month{'\n'}Index</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.logData}>{lastMonthData}</Text>
                                    </View>
                                </View>
                                <View style={styles.logContainer}>
                                    <View>
                                        <Text style={styles.logHead}>Last Year{'\n'}Index</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.logData}>{lastYearData}</Text>
                                    </View>
                                </View>
                            </View>

                            <Text style={{ fontSize: 20, fontFamily: "Poppins", color: '#FF9900', marginTop: 30 }}>
                                What is Fear & Greed Index?
                            </Text>
                            <Text style={{ fontSize: 14, fontFamily: "Poppins", color: '#ffff', marginTop: 10 }}>
                                The Fear & Greed Index is a compilation of five different indicators that measure some aspect of market behavior. These five indicators include volatility, market volume, social media, bitcoin dominance and google search trends.
                            </Text>
                        </View>
                }
            </ScrollView>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    logDataContainer: {
        marginTop: 14,
        display: 'flex',
        flexDirection: 'row',
        gap: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    logContainer: {
        width: 105.72,
        height: 63.14,
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'column',
        paddingVertical: 8,
        paddingHorizontal: 26,
        backgroundColor: '#277676'
    },
    logHead: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffff'
    },
    logData: {
        fontSize: 24,
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    svg: {
        borderWidth: 1,
        borderColor: '#ccc'
    },
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
    textRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
    verticalTextContainer: {
        width: '48%',
    },
    darkText: {
        fontFamily: "Poppins",
        fontSize: 12,
        color: '#ffff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    lightText: {
        fontFamily: "Poppins",
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#3CBEBE',
        marginTop: 10,
    },
    imageContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        marginTop: 70,
        width: 65,
        height: 45,
        resizeMode: 'center',
    },
    Image_text: {
        position: 'absolute',
        top: '74%',
        left: '47%',
        fontSize: 22,
        color: '#00A11E',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    box_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    roundBox: {
        width: 100,
        height: 100,
        borderRadius: 25,
        backgroundColor: '#277676',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFFF'
    },
    paragraph: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFFF'
    }
})