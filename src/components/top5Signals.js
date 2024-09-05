import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import appStyles from '../utils/appStyles'
import { useNavigation } from '@react-navigation/native';

function nFormatter(num, digits) {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function (item) {
        return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

const Top5Signals = ({ item }) => {
    const navigation = useNavigation();
    if (!item) {
        return null; // If there's no item, return null or handle accordingly
    }
    return (
        <TouchableOpacity>

        </TouchableOpacity>
    )
}
export default Top5Signals
const style = StyleSheet.create({})