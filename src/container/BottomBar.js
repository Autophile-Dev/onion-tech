import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Dashboard from '../screens/homeStack/dashboard/dashboard';
import Signals from '../screens/homeStack/signals/signals.js';
import Market from '../screens/homeStack/market/market.js';
import Coins from '../screens/homeStack/coins/coins.js';
import News from '../screens/homeStack/news/news';
import Explore from '../screens/homeStack/explore/explore.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#0C2E2E',
                    height: 55,
                    padding: 5,
                    borderTopRightRadius: 24,
                    borderTopLeftRadius: 24,
                    flex: 1,
                    alignItems: 'center',
                    position: 'absolute',
                    borderColor: '#0C2E2E'
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Dashboard}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Image
                            style={{ width: 24, height: 24 }}
                            source={require("../assets/icons/tab_home.png")}
                            tintColor={color}
                        />
                    ),
                    tabBarActiveTintColor: '#FF9900',
                    tabBarInactiveTintColor: '#FFFFFF',
                    tabBarLabelStyle: {
                        color: '#ffffff'
                    }
                }}

            />
            {/* <Tab.Screen
        name="News"
        label='HOT'
        component={News}
        options={{
          tabBarLabel: 'News',
          tabBarIcon: ({ color }) => (
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../assets/icons/tab_news.png")}
              tintColor={color}
            />
          ),
        }}
      /> */}
            <Tab.Screen
                name="Explore"
                component={Explore}
                options={{
                    tabBarLabel: 'Explore',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Image
                            style={{ width: 30, height: 24 }}
                            source={require("../assets/icons/Group.png")}
                            tintColor={color}
                        />
                    ),
                    tabBarActiveTintColor: '#FF9900',
                    tabBarInactiveTintColor: '#FFFFFF',
                    tabBarLabelStyle: {
                        color: '#ffffff'
                    }
                }}
            />
            <Tab.Screen
                name="Signals"
                component={Signals}
                options={{
                    tabBarLabel: 'Signals',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Image
                            style={{ width: 24, height: 24 }}
                            source={require("../assets/icons/tab_signals.png")}
                            tintColor={color}
                        />
                    ),
                    tabBarActiveTintColor: '#FF9900',
                    tabBarInactiveTintColor: '#FFFFFF',
                    tabBarLabelStyle: {
                        color: '#ffffff'
                    }
                }}
            />
            <Tab.Screen
                name="Coins"
                component={Coins}
                options={{
                    tabBarLabel: 'Coins',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Image
                            style={{ width: 24, height: 24 }}
                            source={require("../assets/icons/tab_coins.png")}
                            tintColor={color}
                        />
                    ),
                    tabBarActiveTintColor: '#FF9900',
                    tabBarInactiveTintColor: '#FFFFFF',
                    tabBarLabelStyle: {
                        color: '#ffffff'
                    }
                }}
            />
            <Tab.Screen
                name="Market"
                component={Market}
                options={{
                    tabBarLabel: 'Market',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Image
                            style={{ width: 24, height: 24 }}
                            source={require("../assets/icons/tab_market.png")}
                            tintColor={color}
                        />
                    ),
                    tabBarActiveTintColor: '#FF9900',
                    tabBarInactiveTintColor: '#FFFFFF',
                    tabBarLabelStyle: {
                        color: '#ffffff'
                    }
                }}
            />

        </Tab.Navigator >
    );
}

export const BottomBar = () => {
    return (
        <MyTabs />
    );
}
