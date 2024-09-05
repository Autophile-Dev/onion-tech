import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TextInput, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import appStyles from '../../utils//appStyles';
import { Text, VStack, HStack, Center, Modal, FormControl, Input, Button } from "native-base";
import { useNavigation } from '@react-navigation/native';
import AuthAPI from '../../services/AuthAPI'
import { ROOT_URL, clientId, androidClientId, iosClientId } from '../../services/index'
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';


WebBrowser.maybeCompleteAuthSession();

const LoginScreen = props => {
    const [accesstoken, setAccesstoken] = React.useState(null);
    const [device_id, setDevice_id] = React.useState("");
    const [user, setUser] = React.useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: clientId,
        androidClientId: androidClientId,
        iosClientId: iosClientId,
    });

    useEffect(() => {
        load()
        if (response?.type === "success") {
            setAccesstoken(response.authentication.accessToken);
            accesstoken && fetchUserInfo()
        }
    }, [response, accesstoken])

    const ShowUserInfo = () => {
        if (user) {
            return (
                <View>
                    <Text>{user.name}</Text>
                    <Image source={{ uri: user.picture }} style={{ width: 100, height: 100 }} />
                </View>
            )
        }
    }

    const fetchUserInfo = async () => {
        const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: {
                Authorization: `Bearer ${accesstoken}`
            }
        })
        const useinfo = await response.json();
        setUser(useinfo);
        if (response.status = 200) {
            google_django(useinfo)
        } else {
            setError("Google Sign in failed !")
            setModalVisible(!modalVisible);
        }
    }

    const [email, setEmail] = React.useState("test@gmail.com");
    const [password, setPassword] = React.useState("okok1234");
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [modalVisible, setModalVisible] = React.useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [error, setError] = React.useState(null);
    const navigation = useNavigation();

    const save = async () => {
        try {
            await AsyncStorage.setItem("username", email)
        } catch (err) {
            alert("error", err)
        }
    }
    const load = async () => {
        try {
            let d_id = await AsyncStorage.getItem("device_id")
            d_id.length > 3 ? setDevice_id(d_id) : None
        } catch (err) {
            console.log("error in login screen", err)
        }
    }
    const remove = async () => {
        try {
            await AsyncStorage.removeItem("Myname")
        } catch (err) {
            alert("error", err)
        }
    }
    const google = async () => {
        // openLink = WebBrowser.openBrowserAsync(ROOT_URL+"accounts/google/login/?process=login")  
        navigation.navigate('BottomBar')
    }
    const signin = async () => {
        try {
            if (email != null && password != null) {
                let data_parse = {
                    email: email,
                    password: password,
                    device_id, device_id
                }
                const res = await AuthAPI.Login_API(data_parse)
                if (res.status == 200) {
                    await AsyncStorage.setItem("userid", '' + res.data['userid'])
                    await AsyncStorage.setItem("username", res.data['username'])
                    await AsyncStorage.setItem("access", res.data['access'])
                    await AsyncStorage.setItem("refresh", res.data['refresh'])
                    navigation.navigate('BottomBar')
                } else {
                    setError("Credentials Invalid !")
                    setModalVisible(!modalVisible);
                }
            } else {
                setError("Credentials required !")
                setModalVisible(!modalVisible);
            }
        } catch (err) {
            setError("An Error Occured !")
            setModalVisible(!modalVisible);
        }
    }
    const google_django = async (useinfo) => {
        useinfo.device_id = device_id
        const res1 = await AuthAPI.Google_Login(useinfo)
        if (res1.status = 200 && res1.data['userid']) {
            await AsyncStorage.setItem("userid", '' + res1.data['userid'])
            await AsyncStorage.setItem("username", res1.data['username'])
            await AsyncStorage.setItem("access", res1.data['access'])
            await AsyncStorage.setItem("refresh", res1.data['refresh'])
            if (res1.data['userid'] != undefined) {
                navigation.navigate('BottomBar')
            } else {
                setError("Google Signin failed !")
                setModalVisible(!modalVisible);
            }
        }
    }
    const openLink = async (item_url) => {
        openLink = WebBrowser.openBrowserAsync(item_url)
    }
    return (
        <View style={styles.screen}>
            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard justifyContent="center" bottom="4" size="lg">
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>{error}</Modal.Header>
                </Modal.Content>
            </Modal>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{
                    marginHorizontal: 10,
                }}
                    showsVerticalScrollIndicator={false}
                >
                    <Center>
                        <Text style={{ color: '#ffff', fontSize: 24, fontFamily: 'Poppins', fontWeight: 'bold', padding: 15, marginTop: 80 }}>Welcome Onboard</Text>
                        <Image
                            style={{ width: 213, height: 146, marginTop: 60 }}
                            source={require('../../assets/icons/login_logo_onion.png')}
                        />
                    </Center>
                    <TouchableOpacity style={{ backgroundColor: '#ffff', borderRadius: 15, marginRight: 12, marginLeft: 12, flexDirection: 'row', height: 40, justifyContent: 'center' }}
                        onPress={() => google()}
                    >
                        <Image
                            style={{ width: 35, height: 35, marginTop: 3 }}
                            source={require('../../assets/icons/login_logo_onion.png')}
                        />
                        <Text style={{ marginLeft: 20, fontSize: 16, fontFamily: 'Poppins', color: '#257B7B', marginTop: 10 }}>test</Text>
                    </TouchableOpacity>


                    <Text style={{ color: '#ffff', fontSize: 32, fontFamily: 'Poppins', fontWeight: 'bold', paddingTop: 10, marginTop: 50, marginLeft: 10 }}>Sign In</Text>
                    <Text style={{ color: '#ffff', fontSize: 12, fontFamily: 'Poppins', marginLeft: 10 }}>Please Sign In to continue</Text>
                    <VStack space={3} mt="5">
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
                            placeholder="Email/username"
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
                        <TouchableOpacity style={{ alignItems: 'flex-end', marginRight: 18 }}
                            onPress={() => openLink(ROOT_URL + "account/password_reset/")}
                        >
                            <Text style={{ color: '#FF9900', fontSize: 12, fontFamily: 'Poppins' }}>Forget Your Password ?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity mt="2" style={{ backgroundColor: '#FF9900', borderRadius: 15, marginRight: 12, marginLeft: 12, marginTop: 23, height: 40, alignItems: 'center' }}
                            onPress={() => signin()}
                        >
                            <Text style={{ fontSize: 16, fontFamily: 'Poppins', color: '#ffff', marginTop: 10 }}>Sign in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: '#ffff', borderRadius: 15, marginRight: 12, marginLeft: 12, flexDirection: 'row', height: 40, justifyContent: 'center' }}
                            onPress={() => promptAsync()}
                        >

                            <Image
                                style={{ width: 35, height: 35, marginTop: 3 }}
                                source={require('../../assets/icons/login_logo_onion.png')}
                            />
                            <Text style={{ marginLeft: 20, fontSize: 16, fontFamily: 'Poppins', color: '#257B7B', marginTop: 10 }}>SIGN IN WITH GOOGLE</Text>
                        </TouchableOpacity>
                        <HStack mt="6" justifyContent="center">
                            <Text style={{ fontSize: 16, fontFamily: 'Poppins', color: '#FF9900', textDecorationLine: 'underline' }} onPress={() => navigation.navigate('SignupScreen')}>Create a new account</Text>
                        </HStack>
                    </VStack>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
};


export default LoginScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        backgroundColor: appStyles.color.background,
        fontFamily: "Poppins",
    },
    text: {
        color: appStyles.color.font,
        padding: 1
    }
});
