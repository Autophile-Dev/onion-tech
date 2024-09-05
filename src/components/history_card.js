import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';


const History_card = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => openLink(item.CoinInfo.Url)}>
      <View style={styles.itemWrapper}>

        {/* Left side */}
        <View style={styles.leftWrapper}>
          <Text><Text style={styles.text_gold}>Lifetime Subscription</Text> {"\n"} <Text style={styles.paragraph}>Subscribed on May 24, 2022</Text> {"\n"}<Text style={styles.text_red}>Will expire on December 31, 2099</Text></Text>
        </View>


        {/* Right side */}
        <View style={styles.rightWrapper}>
          <Text style={styles.title}>$299.99</Text>
          <Text style={styles.paragraph}>Paid via Crypto</Text>
        </View>

      </View>
      {/* <View style={styles.divider} /> */}
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.text_gold}>Cancel My Subscription</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemWrapper: {
    paddingHorizontal: 16,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    backgroundColor: '#1E5A5A',
    borderRadius: 15,
    margin: 10
  },
  leftWrapper: {
    flexDirection: "row",
    alignItems: 'center',
  },
  rightWrapper: {
    alignItems: 'flex-end',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#A9ABB1',
    marginHorizontal: 16,
    marginTop: 16,
  },
  title: {
    color: '#FFFF',
    margin: 10,
    fontSize: 14,
    fontWeight: 'bold',
    padding: 1
  },
  paragraph: {
    color: '#FFFF',
    margin: 10,
    fontSize: 12,
    padding: 1
  },
  text_gold: {
    color: '#FF9900',
    fontSize: 16,
  },
  text_red: {
    color: 'red',
    fontSize: 16,
  },
})

export default History_card
