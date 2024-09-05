import { StyleSheet, View, ImageBackground, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Box, HStack, Text, Pressable, Spacer } from "native-base";
import * as WebBrowser from 'expo-web-browser';


function timeSince(unixTimestamp) {
  var date_timestamp = new Date(unixTimestamp * 1000);
  var today = new Date();
  var time_diff = (today - date_timestamp) / 1000
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

export default function NewsCard({ item }) {
  // const [date , setDate]= useState([""]);

  const openLink = async (item_url) => {
    openLink = WebBrowser.openBrowserAsync(item_url)
  }

  return (

    <Pressable style={styles.press} onPress={() => {
      return (
        openLink(item.url)
      )
    }} key={item.id}>
      {({
        isHovered,
        isFocused,
        isPressed
      }) => {
        return <Box style={{

          position: 'relative',
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.17,
          shadowRadius: 3.05,
          elevation: 8,

        }} rounded="15" borderWidth="0" borderColor='transparent'>
          <ImageBackground source={{ uri: item.imageurl }} resizeMode="cover" borderRadius={15} imageStyle={{ opacity: 0.7 }}
          >
            <Text mt="3" numberOfLines={2} style={{
              font: '#fff',
              fontSize: 14,
              fontFamily: "Poppins",
              color: '#fff',
              marginHorizontal: 15,
              marginTop: 14
            }} >
              {item.title}
            </Text>
            <HStack alignItems="center" style={{ marginTop: 30, marginBottom: 8 }}>
              <Image
                style={{ width: 14, height: 14, marginLeft: 14 }}
                source={require('../assets/icons/time.png')}
              />
              <Text
                style={{
                  font: '#fff',
                  fontSize: 11,
                  fontFamily: "Poppins",
                  color: '#fff',
                  marginLeft: 4,
                  display: 'flex',
                  alignItems: 'center',
                  fontStyle: 'italic',
                }} >
                {timeSince(item.published_on)} Ago
              </Text>

              <Spacer />

              <Text style={{
                font: '#fff',
                fontSize: 11,
                fontFamily: "Poppins",
                color: '#FF9900',
                marginRight: 15,
                display: 'flex',
                alignItems: 'center',
                fontStyle: 'italic',
              }}>{item?.source_info?.name}</Text>

            </HStack>
          </ImageBackground>
        </Box>;
      }}

    </Pressable>


  )
}

const styles = StyleSheet.create({
  press: {
    backgroundColor: '#00000026',
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 15,
  }
})