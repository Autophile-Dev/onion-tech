import { StyleSheet, View, Image } from 'react-native'
import { Pressable } from "native-base";
import React from 'react'
import { useNavigation } from '@react-navigation/native';
const BottmbarHead = ({ props }) => {
    const navigation = useNavigation();
    return (
        <View style={{ position: 'relative', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Pressable onPress={() =>
                navigation.push('ProfileScreen')
            }>
                <Image
                    style={{ width: 32, height: 36, }}
                    source={require('../../src/assets/icons/account.png')}
                />
            </Pressable>
            <Pressable onPress={() =>
                navigation.push('Notifications')
            }>
                <Image
                    style={{ width: 22, height: 26 }}
                    source={require('../../src/assets/icons/Icon_Notif.png')}
                />

            </Pressable>
        </View>
    )
}
export default BottmbarHead;
const styles = StyleSheet.create({})