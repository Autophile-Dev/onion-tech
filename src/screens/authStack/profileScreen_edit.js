import { StyleSheet, View, TextInput, Image, SafeAreaView, ScrollView, StatusBar, Switch } from 'react-native'
import React, { useState, useEffect } from 'react';
import appStyles from '../../utils/appStyles';
import { Box, HStack, Text, Pressable, Spacer, VStack, Center, Modal, FormControl, Input, Button } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileHeader from '../../components/profileHeader';


const ProfileScreen_edit = ({ navigation }) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [email, setEmail] = React.useState("Fahad Munir");
    const [fname, setFname] = React.useState("fname");
    const [lname, setLname] = React.useState("lname");
    const [password, setPassword] = React.useState("password");
    const [new_password, setNew_password] = React.useState("new_password");
    const [dob, setDob] = React.useState("Date of Birth");
    const load_data = async () => {
        try {
            let userid = await AsyncStorage.getItem("userid")
            let username = await AsyncStorage.getItem("username")
            let access = await AsyncStorage.getItem("access")
            let refresh = await AsyncStorage.getItem("refresh")

        } catch (err) {
            alert("error", err)
        }
    }
    useEffect(() => {
        load_data()

    }, [])

    return (
        <View style={styles.screen}>
            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard justifyContent="center" bottom="4" size="lg">
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Enter Reedem Code</Modal.Header>
                    <Modal.Body>
                        <FormControl>
                            <FormControl.Label>Code:</FormControl.Label>
                            <Input />
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button flex="1" onPress={() => {
                            setModalVisible(false);
                        }}>
                            Proceed
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{
                    marginHorizontal: 10,
                }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ paddingHorizontal: 10 }}>
                        <ProfileHeader />
                    </View>
                    <View style={styles.headText}>
                        <Text style={styles.newsText} >Profile </Text>
                    </View>
                    <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={{ width: 140, height: 140 }}
                            source={require('../../assets/icons/furqan_logo.png')}
                        />
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <View style={styles.input_view}>
                            <Text style={styles.input_view_text}>
                                First name: </Text>
                            <TextInput
                                style={styles.input_view_textInput}
                                onChangeText={setFname}
                                value={fname}
                                placeholder="First Name"
                                keyboardType="Text"
                            />
                            <Image
                                style={{ width: 15, height: 15, marginRight: 10 }}
                                source={require('../../assets/icons/edit_pencil.png')}
                            />
                        </View>
                        <View style={styles.input_view}>
                            <Text style={styles.input_view_text}>
                                Last name: </Text>
                            <TextInput
                                style={styles.input_view_textInput}
                                onChangeText={setLname}
                                value={lname}
                                placeholder="Last Name"
                                keyboardType="Text"
                            />
                            <Image
                                style={{ width: 15, height: 15, marginRight: 10 }}
                                source={require('../../assets/icons/edit_pencil.png')}
                            />
                        </View>
                        <View style={styles.input_view}>
                            <Text style={styles.input_view_text}>
                                Old Passwords: </Text>
                            <TextInput
                                style={styles.input_view_textInput}
                                onChangeText={setPassword}
                                value={password}
                                placeholder="Old Password"
                                keyboardType="Text"
                            />
                            <Image
                                style={{ width: 15, height: 15, marginRight: 10 }}
                                source={require('../../assets/icons/edit_pencil.png')}
                            />
                        </View>
                        <View style={styles.input_view}>
                            <Text style={styles.input_view_text}>
                                Passwords: </Text>
                            <TextInput
                                style={styles.input_view_textInput}
                                onChangeText={setNew_password}
                                value={new_password}
                                placeholder="New Password"
                                keyboardType="Text"
                            />
                            <Image
                                style={{ width: 15, height: 15, marginRight: 10 }}
                                source={require('../../assets/icons/edit_pencil.png')}
                            />
                        </View>
                        <View style={styles.input_view}>
                            <Text style={styles.input_view_text}>
                                Date of Birth: </Text>
                            <TextInput
                                style={styles.input_view_textInput}
                                onChangeText={setDob}
                                value={dob}
                                placeholder="Date Of Birth"
                                keyboardType="Text"
                            />
                            <Image
                                style={{ width: 15, height: 15, marginRight: 10 }}
                                source={require('../../assets/icons/edit_pencil.png')}
                            />
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 30 }}>
                        <Text style={{
                            fontFamily: "Poppins",
                            color: '#FFFFFF',
                            fontSize: 16,
                            textDecorationLine: 'none',
                            backgroundColor: '#FF9900',
                            paddingVertical: 15,
                            paddingHorizontal: 50,
                            fontWeight: 'bold',
                            borderRadius: 10,
                        }}>
                            Update </Text>

                    </View>




                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
export default ProfileScreen_edit;
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
    },
    input_view: {
        backgroundColor: '#ffff',
        borderRadius: 15,
        display: 'flex',
        alignItems: 'center',
        flexDirection: "row",
        margin: 7,
    },
    input_view_text: {
        fontFamily: "Poppins",
        color: '#195454',
        fontSize: 16,
        margin: 12,
        fontWeight: 'bold',
    },
    input_view_textInput: {
        flex: 1,
        fontFamily: "Poppins",
        color: '#195454',
        fontSize: 16,
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