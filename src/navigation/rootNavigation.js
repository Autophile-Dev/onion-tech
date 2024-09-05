import { StyleSheet, Text, View, Button, Image } from 'react-native'
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/authStack/profileScreen'
import ProfileScreen_edit from '../screens/authStack/profileScreen_edit'
// import LoginScreen from '../screens/authStack/LoginScreen'
import SignupScreen from '../screens/authStack/SignupScreen'
import { Pressable } from "native-base";
import { BottomBar } from '../container/BottomBar'
import BottmbarHead from '../container/BottmbarHead'
import Subscription from '../screens/authStack/subscription';
import Premium_history from '../screens/authStack/premium_history';
import Non_Premium_history from '../screens/authStack/non_premium_history';
import Payment_via_crypto from '../screens/authStack/payment_via_crypto';
import Notifications from '../screens/homeStack/notifications';
import CoinDetails from '../components/coinDetails'
import Gpay from '../screens/authStack/google_pay';
import Explore from '../screens/homeStack/explore/explore';
const RootNavigation = () => {
    const Stack = createNativeStackNavigator();
    const headStyle = {
        headerStyle: {
            fontFamily: "Poppins",
            backgroundColor: '#1C4C4C',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerShown: true,
    }

    return (

        <Stack.Navigator initialRouteName='Onion_Crypto'
        >
            <Stack.Screen
                name="Onion_Crypto" component={BottomBar}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Subscription"
                component={Subscription}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Gpay"
                component={Gpay}
                options={headStyle}
            />
            <Stack.Screen
                name="Premium_history"
                component={Premium_history}
                options={headStyle}
            />
            <Stack.Screen
                name="Free_User_history"
                component={Non_Premium_history}
                options={headStyle}
            />
            <Stack.Screen
                name="Payment_via_crypto"
                component={Payment_via_crypto}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="BottomBar"
                component={BottomBar}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="BottmbarHead"
                component={BottmbarHead}
                options={{ headerShown: true }}
            />
            {/* <Stack.Screen 
      name="LoginScreen" 
      component={Gpay} 
      options={{headerShown: false}}
      /> */}
            <Stack.Screen
                name="SignupScreen"
                component={SignupScreen}
                options={headStyle}
            />
            <Stack.Screen
                name="Notifications"
                component={Notifications}
                options={headStyle}
            />
            <Stack.Screen
                name="CoinDetails"
                component={CoinDetails}
                options={headStyle}
            />
            <Stack.Screen
                name="ProfileScreen_edit"
                component={ProfileScreen_edit}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Explore"
                component={Explore}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>

    )
}

export default RootNavigation
