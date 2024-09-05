import { StyleSheet, View, Image } from 'react-native'
import { Pressable } from "native-base";
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const ProfileHeader = ({ props }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.profileHeaderContainer}>
            <Pressable onPress={() => navigation.goBack()}>
                <Image style={{ width: 24, height: 24, }} source={require('../../src/assets/icons/arrow_back.png')} />
            </Pressable>
            <Pressable onPress={() =>
                navigation.push('Notifications')
            }>
                <Image
                    style={{ width: 27, height: 30 }}
                    source={require('../../src/assets/icons/faq.png')}
                />

            </Pressable>
        </View>
    )
}
export default ProfileHeader;
const styles = StyleSheet.create({
    profileHeaderContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})