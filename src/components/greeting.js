import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import LottieView from "lottie-react-native";
import appStyles from '../utils/appStyles';
export default function Greeting() {
    const [message, setMessage] = React.useState('Evening');
    const [night, setNight] = React.useState(false);
    const devicewidth = Dimensions.get('window').width
    React.useEffect(() => {
        const now = new Date().getHours();

        if (now < 11) {
            setMessage('Morning');
            setNight(false)
        } else if (now >= 11 && now <= 16) {
            setMessage('Afternoon');
            setNight(false)
        }
        else if (now > 22) {
            setMessage('There')
            setNight(true)
        }

    }, []);
    return (

        <TouchableOpacity>
            <View style={styles.card}>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.text}>{night ? 'Hello' : 'Good'}</Text>
                        <Text style={styles.textbottom}>{message}</Text>
                    </View>

                    <View style={{ marginTop: 0, marginRight: 0 }}>
                        {message === 'Morning' || message === 'Afternoon' ? <LottieView style={{ width: 30, height: 30 }} resizeMode='cover' source={require('../assets/icons/morning-sun.json')} autoPlay /> : <LottieView style={{ width: 30, height: 30 }} resizeMode='cover' source={require('../assets/icons/night.json')} autoPlay />}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    card: {
        backgroundColor: appStyles.color.background,
        margin: 10,
        width: Dimensions.get('window').width,
        marginTop: 0,
        marginBottom: 0,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    text: {
        marginLeft: 5,
        color: appStyles.color.font,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
    },
    textbottom: {
        marginLeft: 6,
        color: appStyles.color.font,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Poppins',

    },
});
