import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TabParams, Screen } from '../types';
import HomeScreen from '../../screens/home/home.screen';
import ResourcesScreen from '../../screens/resources/resources.screen';
import ChannelsScreen from '../../screens/channels/channels.screen';
import ProfileScreen from '../../screens/profile/pofile.screen';
import { Colors } from '../../../../assets/colors';
import SystemNavigationBar from 'react-native-system-navigation-bar';

const Tab = createBottomTabNavigator<TabParams>();

export default function TabNavigator() {
  useEffect(() => {
 SystemNavigationBar.navigationHide();
}, []);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTitle: () => null,
        headerStyle: {
          backgroundColor: Colors.Background,
        },
        headerTintColor: Colors.Background,
        tabBarStyle: {
          backgroundColor: Colors.Background,
          
        },
        tabBarShowLabel: true,  // Mostra il testo sotto l'icona
        tabBarLabelStyle: {
          fontSize: 12, // Puoi regolare la dimensione del testo
          color: Colors.TextColorOnGreen,  // Colore del testo
        },
        tabBarIconStyle: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIcon: ({ focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          
          if (route.name === Screen.Home) {
            iconName = 'home';
          } else if (route.name === Screen.Profile) {
            iconName = 'person';
          } else if (route.name === Screen.Channels) {
            iconName = 'megaphone';
          } else if (route.name === Screen.Resources) {
            iconName = 'document-text';
          }

          return <Ionicons name={iconName} size={24} color={focused ? '#FFFFFF' : '#D3D3D3'} />;
        },
      })}
    >
      <Tab.Screen name={Screen.Home} component={HomeScreen} />
      <Tab.Screen name={Screen.Resources} component={ResourcesScreen} />
      <Tab.Screen name={Screen.Channels} component={ChannelsScreen} />
      <Tab.Screen name={Screen.Profile} component={ProfileScreen} />
    </Tab.Navigator>
  );
}
