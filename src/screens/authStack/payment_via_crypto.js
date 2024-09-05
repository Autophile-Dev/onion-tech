import { StyleSheet, View, FlatList, Image, TextInput, SafeAreaView, ScrollView, StatusBar, RefreshControl, TouchableOpacity, Clipboard } from 'react-native'
import React, { useState } from 'react'
import appStyles from '../../utils/appStyles';
import { Box, HStack, Text, Pressable, Center, Button } from "native-base";
import History_card from '../../components/history_card'
import ProfileHeader from '../../components/profileHeader';
export default function Payment_via_crypto({ navigation }) {
    const [textToCopy, setTextToCopy] = useState('TPEiGHk6nvHZGGuCpPE3r1GeizUFTSbohu');
    const [refreshing, setRefreshing] = React.useState(false);
    const [username, setUsername] = React.useState(null);
    const handleCopyText = async () => {
        await Clipboard.setString(textToCopy);
        console.log('Text copied!');
    };
    const TXID = async () => {
        try {
            console.log("TXID")
            // navigation.navigate('BottomBar')
        } catch (err) {
            alert("error in signup", err)
        }
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // coin_fetch()
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    }, []);
    const [alldata, setAlldata] = useState([
        { "id": 1, }
    ]);
    return (
        <SafeAreaView style={styles.screen}>
            <View style={{ paddingHorizontal: 10 }}>
                <ProfileHeader />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headText}>
                    <Text style={styles.newsText} >Pay via Crypto </Text>
                </View>
                <View style={styles.container_box}>
                    <View style={styles.upperBox}>
                        <Pressable style={styles.box}>
                            <Text style={{ color: '#1C4C4C', fontSize: 14, padding: 1, fontWeight: '600' }}>Per Month</Text>
                            <Text style={{ color: '#1C4C4C', fontSize: 32, fontWeight: 'bold', paddingTop: 14, }}>9.99</Text>
                            <Text style={{ color: '#1C4C4C', fontSize: 20, fontWeight: 'bold', padding: 1, }}>USDT</Text>
                        </Pressable>
                        <Pressable style={styles.box}>
                            <Text style={{ color: '#1C4C4C', fontSize: 14, padding: 1, fontWeight: '600' }}>Per 3 Month</Text>
                            <Text style={{ color: '#1C4C4C', fontSize: 32, fontWeight: 'bold', paddingTop: 14, }}>24.99</Text>
                            <Text style={{ color: '#1C4C4C', fontSize: 20, fontWeight: 'bold', padding: 1, }}>USDT</Text>
                        </Pressable>
                        <Pressable style={styles.box}>
                            <Text style={{ color: '#1C4C4C', fontSize: 14, padding: 1, fontWeight: '600' }}>Per Year</Text>
                            <Text style={{ color: '#1C4C4C', fontSize: 32, fontWeight: 'bold', paddingTop: 14, }}>89.99</Text>
                            <Text style={{ color: '#1C4C4C', fontSize: 20, fontWeight: 'bold', padding: 1, }}>USDT</Text>
                        </Pressable>
                    </View>
                    <Pressable style={{ backgroundColor: '#fff', borderRadius: 15, paddingTop: 10, paddingHorizontal: 16, paddingBottom: 25 }}>
                        <View style={{ display: 'flex', flexDirection: 'column' }}>
                            <Text style={{ color: '#1C4C4C', fontSize: 14, padding: 1, fontWeight: '600' }}>Lifetime Subscription</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', }}>
                                <Text style={{ color: '#1C4C4C', fontSize: 32, fontWeight: 'bold', paddingTop: 14, }}>299.99</Text>
                                <Text style={{ color: '#1C4C4C', fontSize: 20, fontWeight: 'bold', padding: 1, paddingLeft: 10, paddingTop: 10 }}>USDT</Text>
                            </View>
                        </View>
                    </Pressable>
                </View>
                <View style={{ paddingHorizontal: 10 }}>

                    <Pressable style={{ backgroundColor: '#1E5A5A', justifyContent: 'center', borderRadius: 15, marginTop: 10 }} onPress={handleCopyText}>
                        <View style={{ paddingTop: 12, paddingHorizontal: 16, paddingBottom: 16 }}>
                            <Text style={{ color: '#FF9900', fontSize: 16, padding: 1, fontWeight: 'bold' }}>USDT (TRC-20) Address:</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Text style={{ color: '#FFFF', fontSize: 12, fontWeight: '400', padding: 1, }}>TPEiGHk6nvHZGGuCpPE3r1GeizUFTSbohu</Text>
                                <Image
                                    style={{ width: 14, height: 16 }}
                                    source={require('../../assets/icons/clipboard.png')}
                                />
                            </View>
                        </View>
                    </Pressable>
                </View>
                <Text style={styles.title}>
                    How to Pay via Crypto?
                </Text>
                <Text style={styles.paragraph}>
                    1. Copy USDT (TRC-20) address mentioned above.{"\n"}
                    2. Go to your exchange/wallet and chose “Withdraw”{"\n"}
                    3. Select USDT (Tron Network or TRC20) and paste address you copied from above.{"\n"}
                    4. Enter an amount corresponding to above subscriptionplans. (i.e., 10, 25, 90 or 300 USDT){"\n"}
                    5. Make a transaction and wait for its approval.{"\n"}
                    6. You’ll get a transaction ID (TXID or transaction hash){"\n"}
                    7. Paste your transaction ID down below.{"\n"}
                </Text>
                <View style={{ marginTop: 30, display: 'flex', flexDirection: 'column' }}>
                    <Text style={styles.TXTitle}>
                        Your TXID:
                    </Text>
                    <TextInput
                        style={{
                            paddingVertical: 16,
                            marginRight: 12,
                            marginLeft: 12,
                            color: '#77ADAD',
                            backgroundColor: '#1E5A5A',
                            borderRadius: 5,
                            paddingHorizontal: 22,
                        }}
                        onChangeText={setUsername}
                        value={username}
                        placeholder="Paste Here"
                        keyboardType="text"
                    />
                </View>

                <TouchableOpacity style={{ backgroundColor: '#FF9900', width: 120, borderRadius: 5, marginLeft: 12, marginTop: 15, marginBottom: 10, height: 40, alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
                    onPress={() => TXID()}
                >
                    <Text style={{ fontSize: 16, fontFamily: 'Poppins', color: '#ffff', fontWeight: 'bold' }} >Submit</Text>
                </TouchableOpacity>
                <Text style={styles.paragraphLower}>
                    After verification of your payment, your subscription will be automatically updated within 1-6 hours.
                </Text>
                <View style={{ marginTop: 80, height: 100, alignItems: 'center' }}>
                    <Pressable onPress={() => navigation.navigate('Payment_via_crypto')}><Text style={{
                        fontSize: 12,
                        fontFamily: "Poppins",
                        color: '#FF9900',
                        marginLeft: 10,
                        textDecorationLine: 'underline',
                    }}>Terms and Conditions | EULA</Text></Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 10,
        backgroundColor: appStyles.color.background,
        fontFamily: "Poppins",
    },
    title: {
        color: appStyles.color.font,
        marginLeft: 15,
        marginTop: 26,
        fontSize: 14,
        fontWeight: 'bold',
    },
    TXTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: appStyles.color.font,
        marginLeft: 15,
        marginBottom: 14,
    },
    paragraph: {
        color: appStyles.color.font,
        marginHorizontal: 20,
        marginTop: 14,
        fontSize: 12,
    },
    paragraphLower: {
        marginHorizontal: 10,
        fontSize: 11,
        width: 290,
        color: '#77ADAD'
    },
    text_gold: {
        color: '#FF9900',
        fontSize: 16,
    },
    container_box: {
        display: 'flex',
        flexDirection: 'column',
        marginHorizontal: 10,
        gap: 10,
    },
    box: {
        width: 110,

        backgroundColor: '#fff',
        paddingTop: 18,
        paddingHorizontal: 16,
        borderRadius: 15,
        paddingBottom: 36
    },
    upperBox: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
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
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
        justifyContent: 'start',
    }
})