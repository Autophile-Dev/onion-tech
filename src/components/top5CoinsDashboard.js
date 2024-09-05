import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import appStyles from '../utils/appStyles'
import { useNavigation } from '@react-navigation/native';


const Top5CoinsDashboard = ({ item }) => {
    const navigation = useNavigation();
    if (!item) {
        return null; // If there's no item, return null or handle accordingly
    }
    const fullName = item.CoinInfo.FullName;
    const internal = item.CoinInfo.Internal;
    const price = item.RAW.USD.PRICE;
    const priceChangePercentage7d = item.RAW.USD.CHANGEPCT24HOUR;
    const priceChangeColor = priceChangePercentage7d > 0 ? '#43DE6E' : '#FF4D4D';
    const openLink = async (item_url) => {
        navigation.navigate('CoinDetails', item);
    };
    return (
        <TouchableOpacity onPress={openLink} style={style.container}>
            <View style={style.chart}>
                {priceChangePercentage7d > 0
                    ? <Image style={style.chartImage} source={require('../assets/icons/VectorGreen.png')} /> :
                    <Image style={style.chartImage} source={require('../assets/icons/graph_low.png')} />
                }
            </View>
            <View style={style.cardHeadContainer}>
                <View style={style.headContentTop}>
                    <Image style={style.contentImage} source={{ uri: "https://www.cryptocompare.com" + item.CoinInfo.ImageUrl }} />
                    <View style={style.contentInfo}>
                        <Text style={style.coinTitle}>{fullName}</Text>
                        <Text style={style.coinSubtitle}>{internal}</Text>
                    </View>
                </View>
                <View style={style.headContentBottom}>
                    <Text style={style.coinPrice}>$ {(price).toFixed(2)}</Text>
                    <View style={style.priceChangeContainer}>
                        {priceChangePercentage7d > 0 ? <Image style={style.indicateIcon}
                            source={require('../assets/icons/up_price.png')}
                        /> : <Image style={style.indicateIcon} source={require('../assets/icons/down_price.png')}
                        />}
                        <Text style={[style.priceChange, { color: priceChangeColor }]}>{(priceChangePercentage7d).toFixed(2)}%</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
export default Top5CoinsDashboard
const style = StyleSheet.create({
    container: {
        backgroundColor: appStyles.color.topCoinBackground,
        width: 144,
        borderRadius: 15,
        overflow: 'hidden',
        height: 86,
    },
    cardHeadContainer: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
    },
    headContentTop: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    headContentBottom: {
        marginTop: 3,
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    contentImage: {
        width: 25,
        height: 25,
    },
    contentInfo: {

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    coinTitle: {
        alignItems: 'center',
        fontSize: 12,
        color: appStyles.color.font,
    },
    coinSubtitle: {
        alignItems: 'center',
        fontSize: 11,
        color: appStyles.color.font,
        marginTop: 2,
    },
    coinPrice: {
        fontSize: 11,
        color: appStyles.color.font,
        fontWeight: '500'
    },
    priceChangeContainer: {
        marginTop: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    indicateIcon: {
        width: 7,
        justifyContent: 'flex-start',
        height: 6,
    },
    priceChange: {
        fontSize: 11,
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
    chartImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Ensure the image covers the whole area
    },
});