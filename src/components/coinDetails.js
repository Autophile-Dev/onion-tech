import { StyleSheet, Text, View, Image, FlatList, SafeAreaView, ScrollView, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useRef, useMemo, useState, useEffect } from 'react';
import appStyles from '../utils/appStyles';
import { advancedChart, lineChart, headerV3, assetsChartm, coinChart } from '../container/cryptowidgets'
import { WebView } from 'react-native-webview';
import ProfileHeader from './profileHeader';

const CoinDetails = (item) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const data = item.route.params
  console.log("item++", data.DISPLAY.USDT)

  const assetsChartSHOW = () => {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                 <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body style="margin:0px; padding:0px; background-color:#1C4C4C;">
            ${coinChart(data.CoinInfo.Internal)}
            </body>
        </html>
    `
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    coin_fetch()
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {

  }, [])


  return (
    <>
      <WebView
        source={{ html: assetsChartSHOW() }}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={{ margin: 10, borderRadius: 15 }}>
            <Text style={styles.heading}>
              About {data.CoinInfo.FullName}:
            </Text>
            <Text style={styles.paragraph}>
              {data.CoinInfo.FullName}, also known as  {data.CoinInfo.Name}, is a cryptocurrency with a rating of {data.CoinInfo.Rating.Weiss.Rating}. It has a proof of work consensus algorithm using {data.CoinInfo.Algorithm} and has a block time of {data.CoinInfo.BlockTime} seconds. The current block reward is {data.CoinInfo.BlockReward} coins and the max supply of the currency is {data.CoinInfo.MaxSupply} coins. The currency was first launched on {data.CoinInfo.AssetLaunchDate}.
            </Text>
            <View style={styles.divider} />
            <Text style={styles.heading} >Live Price Data</Text>
            <Text style={styles.paragraph}>
              {data.CoinInfo.Internal}, is currently trading at {data.DISPLAY.USD.PRICE}, representing a {data.DISPLAY.USD.CHANGEPCT24HOUR > 0 ? <Text>gain</Text> : <Text>loss</Text>} from its price 24 hours ago, which was {data.DISPLAY.USD.CHANGEPCT24HOUR} . With a market capitalization of {data.DISPLAY.USD.MKTCAP}, {data.CoinInfo.Internal} ranks well position among all cryptocurrencies in the world. The 24 hour trading volume for {data.CoinInfo.Internal} stands at {data.DISPLAY.USD.VOLUME24HOUR}, demonstrating strong investor interest and market liquidity.
              VOLUME24HOURTO
              At OnionX, we strive to provide the most accurate and up-to-date information in the market. Our data is live, ensuring that you have access to the latest market trends and pricing information in real-time.
            </Text>
          </View>
        </ScrollView>

      </SafeAreaView>



    </>

  )
}


export default CoinDetails;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor: appStyles.color.background,
  },

  text: {
    color: appStyles.color.font,
    padding: 1,
    fontFamily: "Poppins",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#A9ABB1',
    marginHorizontal: 16,
    marginTop: 16,
  },
  heading: {
    color: appStyles.color.font,
    fontSize: 16,
    fontFamily: "Poppins",
  },
  paragraph: {
    color: appStyles.color.font,
    fontSize: 14,
    fontFamily: "Poppins",
  }

})