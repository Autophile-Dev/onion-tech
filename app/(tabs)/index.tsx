import { Image, StyleSheet, Platform, View } from 'react-native';
import RootNavigation from '../../navigation/rootNavigation'
import { NavigationContainer } from '@react-navigation/native';
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
