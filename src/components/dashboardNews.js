import { StyleSheet, View, ImageBackground, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Box, HStack, Text, Pressable, Spacer } from "native-base";
import * as WebBrowser from 'expo-web-browser';

export default function DashboardNews({ item }) {
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

            }) => {
                return <Box style={{
                    width: 200,
                    height: 130,
                }} rounded="15" borderWidth="0" borderColor='transparent'>
                    <ImageBackground source={{ uri: item.imageurl }} resizeMode="cover" borderRadius={15} imageStyle={{ opacity: 0.6 }}
                    >
                        <View style={styles.boxContent}>
                            <Text style={styles.titleContent}>{item.title}</Text>
                        </View>
                    </ImageBackground>
                </Box>
            }}
        </Pressable>
    )
}
const styles = StyleSheet.create({
    press: {
        backgroundColor: '#00000026',
        borderRadius: 15,
    },
    boxContent: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        height: '100%',
        alignItems: 'flex-end'
    },
    titleContent: {
        fontSize: 13,
        fontFamily: "Poppins",
        color: '#fff',
        marginBottom: 18,
        marginHorizontal: 15
    }
})