import { StyleSheet, View, ImageBackground, Image, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import appStyles from '../../utils/appStyles';
import { Box, HStack, Text, Pressable, Center, Button } from "native-base";
export default function Non_Premium_history({ navigation }) {
    return (
        <View style={styles.screen}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{
                }}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.title}>
                        My Plan
                    </Text>
                    <Text style={styles.paragraph}>
                        You’re currently a free user
                    </Text>
                    <Pressable ><Text style={styles.text_gold}>Upgrade to Premium.</Text></Pressable>
                    <Text style={styles.title}>
                        Subscription History
                    </Text>
                    <Text style={styles.paragraph}>
                        No Subscription history found.
                    </Text>
                </ScrollView>
            </SafeAreaView>

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: appStyles.color.background,
        fontFamily: "Poppins",
    },
    title: {
        color: appStyles.color.font,
        margin: 10,
        fontSize: 18,
        fontWeight: 'bold',
        padding: 1
    },
    paragraph: {
        color: appStyles.color.font,
        margin: 10,
        fontSize: 16,
        padding: 1
    },
    text_gold: {
        marginLeft: 20,
        color: '#FF9900',
        fontSize: 16,
    },
})