
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import RootStack from './src/ui/navigation/root.stack';
import { AuthProvider } from './src/context/authContext.context';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { useEffect } from 'react';
import { Colors } from './assets/colors';
import 'react-native-reanimated'
import 'react-native-gesture-handler'

export default function App() {
useEffect(() => {
 SystemNavigationBar.navigationHide();
}, []);
  return (
    <AuthProvider>
    <NavigationContainer>
      <StatusBar style="light"
       />
      <RootStack />
    </NavigationContainer>
    </AuthProvider>
  );
}
