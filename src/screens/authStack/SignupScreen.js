import React, { useState } from 'react';
import { StyleSheet, View, Image, TextInput, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import appStyles from '../../utils/appStyles';
import { Text, VStack, Center } from "native-base";
import { useNavigation } from '@react-navigation/native';
import AuthAPI from '../../services/AuthAPI'

const SignupScreen = props => {
    const [username, setUsername] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = useState(null)
    const [cpassword, setCpassword] = useState(null)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [cpasswordVisible, setCpasswordVisible] = useState(false)
    // const {navigation} = props;
    const navigation = useNavigation();
    const signup = async () => {
        try {
            let data_parse = {
                username: username,
                email: email,
                password: password
            }
            const res = await AuthAPI.SignUp_API(data_parse)
            // console.log("res++",res)
            if (res.status == 200) {
                // await AsyncStorage.setItem("userid",''+res.data['userid'])
                // await AsyncStorage.setItem("username",res.data['username'])
                // await AsyncStorage.setItem("access",res.data['access'])
                // await AsyncStorage.setItem("refresh",res.data['refresh'])
                console.log("res++", res.data)
                navigation.navigate('LoginScreen')

            }
            // navigation.navigate('BottomBar')
        } catch (err) {
            alert("error in signup", err)
        }
    }
    return (
        <View style={styles.screen}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    style={{
                        marginLeft: 10,
                        marginRight: 10,
                        borderTopRightRadius: 35,
                        borderTopLeftRadius: 35,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <Center>
                        <Text style={{ color: '#ffff', fontSize: 24, fontFamily: 'Poppins', fontWeight: 'bold', padding: 15, marginTop: 30 }}>Welcome Onboard</Text>
                        <Image
                            style={{ width: 213, height: 146, marginTop: 60 }}
                            source={require('../../assets/icons/login_logo_onion.png')}
                        />
                    </Center>


                    <Text style={{ color: '#ffff', fontSize: 32, fontFamily: 'Poppins', fontWeight: 'bold', paddingTop: 10, marginTop: 50, marginLeft: 10 }}>Sign Up</Text>
                    <Text style={{ color: '#ffff', fontSize: 12, fontFamily: 'Poppins', marginLeft: 10 }}>Create new account to continue</Text>
                    <VStack space={3} mt="5" >
                        <TextInput
                            style={{
                                height: 40,
                                marginRight: 12,
                                marginLeft: 12,
                                color: '#fff',
                                backgroundColor: '#1E5A5A',
                                borderRadius: 15,
                                padding: 10
                            }}
                            onChangeText={setUsername}
                            value={username}
                            placeholder="Username"
                            keyboardType="text"
                        />
                        <TextInput
                            style={{
                                height: 40,
                                marginRight: 12,
                                marginLeft: 12,
                                color: '#fff',
                                backgroundColor: '#1E5A5A',
                                borderRadius: 15,
                                padding: 10
                            }}
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Email"
                            keyboardType="email"
                        />
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            height: 40,
                            marginRight: 12,
                            marginLeft: 12,
                            color: '#fff',
                            backgroundColor: '#1E5A5A',
                            borderRadius: 15,
                            padding: 10
                        }}>
                            <TextInput
                                secureTextEntry={!passwordVisible}
                                style={{ color: '#fff', flex: 1 }}
                                onChangeText={setPassword}
                                value={password}
                                placeholder="Password"
                                keyboardType="password"
                            />
                            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                                <Image
                                    style={{ width: 22, height: 13, marginTop: 5 }}
                                    source={passwordVisible ? require('../../assets/icons/login_logo_onion.png') : require('../../assets/icons/eye_open.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            height: 40,
                            marginRight: 12,
                            marginLeft: 12,
                            color: '#fff',
                            backgroundColor: '#1E5A5A',
                            borderRadius: 15,
                            padding: 10
                        }}>
                            <TextInput
                                secureTextEntry={!cpasswordVisible}
                                style={{ color: '#fff', flex: 1 }}
                                onChangeText={setCpassword}
                                value={cpassword}
                                placeholder="Confirm Password"
                                keyboardType="password"
                            />
                            <TouchableOpacity onPress={() => setCpasswordVisible(!cpasswordVisible)}>
                                <Image
                                    style={{ width: 22, height: 13, marginTop: 5 }}
                                    source={cpasswordVisible ? require('../../assets/icons/login_logo_onion.png') : require('../../assets/icons/eye_open.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity mt="2" style={{ backgroundColor: '#FF9900', borderRadius: 15, marginRight: 12, marginLeft: 12, marginTop: 23, height: 40, alignItems: 'center' }}
                            onPress={() => signup()}
                        >
                            <Text style={{ fontSize: 16, fontFamily: 'Poppins', color: '#ffff', marginTop: 10 }} >Sign Up</Text>
                        </TouchableOpacity>
                    </VStack>

                </ScrollView>
            </SafeAreaView>
        </View>
    )

};


export default SignupScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: appStyles.color.background,
        fontFamily: "Poppins",
    },
    text: {
        color: appStyles.color.font,
        padding: 1
    }
});
