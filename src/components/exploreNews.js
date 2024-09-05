import { StyleSheet, View, ImageBackground, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Box, HStack, Text, Pressable, Spacer, Skeleton } from "native-base";
import * as WebBrowser from 'expo-web-browser';
import appStyles from '../utils/appStyles';



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
export default function ExploreNewsCard({ item, loading }) {
    const openLink = async (item_url) => {
        openLink = WebBrowser.openBrowserAsync(item_url)
    }
    return (
        <Pressable style={styles.press} onPress={() => {
            return (
                openLink(item.url)
            )
        }} key={item.id}>
                <Box style={styles.exploreNewsContainer} rounded="15" borderWidth="0" borderColor='transparent'>
                    <View style={styles.exploreLeft}>
                        <Text noOfLines={2} lineHeight={15} style={styles.newsTitle}>{item.title}</Text>
                        <Text noOfLines={4} lineHeight={15} style={styles.newDescription}>{item.body}</Text>
                    </View>
                    <View style={styles.exploreRight}>
                        <Image style={styles.newsImage} source={{ uri: item.imageurl }} />
                        <View style={styles.newsTime}>
                            <Image
                                style={styles.timeIconImage}
                                source={require('../assets/icons/timer.png')}
                            />
                            <Text style={styles.timeNewsDuration}>{timeSince(item.published_on)} Ago</Text>
                        </View>
                    </View>
                </Box>
        </Pressable >
    )
}
const styles = StyleSheet.create({
    press: {
        marginRight: 40,
    },
    
    exploreNewsContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 14,
        backgroundColor: '#F3F3F3',
        borderRadius: 15,
        justifyContent: 'space-between',
    },
    exploreSkeleton: {
        display: 'flex',
        height: 115,
        width: "100%",
        flexDirection: 'row',
        backgroundColor: appStyles.color.background,
        borderRadius: 15,
    },
    exploreLeft: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        width: '50%',
        justifyContent: 'center',
    },
    exploreRight: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'column',
        width: '50%',
        gap: 12,
    },
    newsTitle: {
        fontSize: 13,
        fontFamily: "Poppins",
        fontWeight: '700',
        color: '#242424',
    },
    newDescription: {
        fontSize: 11,
        fontFamily: "Poppins",
        color: '#242424',
    },
    newsImage: {
        width: 120,
        height: 70,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    newsTime: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        justifyContent: 'flex-end'
    },
    timeIconImage: {
        width: 12,
        height: 12
    },
    timeNewsDuration: {
        display: 'flex',
        alignItems: 'center',
        fontStyle: 'italic',
        fontSize: 11,
        fontFamily: "Poppins",
        color: '#1C4C4C'
    }
})