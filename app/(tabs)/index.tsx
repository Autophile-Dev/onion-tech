import { Image, StyleSheet, Platform, View } from 'react-native';
import RootNavigation from '../../src/navigation/rootNavigation'
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import store from '../../src/redux/store'
export default function HomeScreen() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
