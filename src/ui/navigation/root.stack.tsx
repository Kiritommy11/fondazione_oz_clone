import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './tab/tab.navigator';
import { MainParamList, Screen } from './types';
import NotificationsScreen from '../screens/notifications/notifications.screen';
import LoginScreen from '../screens/login/login.screen'; 
import { useAuth } from '../../context/authContext.context';
import EditProfileScreen from '../screens/editProfile/editProfile.screen';
import CreateProfileScreen from '../screens/createProfile/createProfile.screen';
import StaffListScreen from '../screens/staffList/staffList.screen';
import StaffDetailScreen from '../screens/staffDetail/staffDetail.screen';
import AddLinkButtonScreen from '../screens/addLinkButton/addLinkButton.screen';
import ResourceDetailScreen from '../screens/resourceDetail/resourceDetail.screen';
import AddSubButtonsScreen from '../screens/addSubButton/addSubButton.screen';
import EditLinkButtonScreen from '../screens/editLinkButton/editLinkButton.screen';
import HomePreferenceScreen from '../screens/homePreference/homePreference.screen';
import LoadingIndicator from '../atoms/loadingIndicator/loadingIndicator.atom';
import ChannelChatScreen from '../screens/channelChat/channelChat.screen';
import CreateChannelScreen from '../screens/createChannel/createChannel.screen';
import EditChannelScreen from '../screens/editChannel/editChannel.screen';

const Stack = createStackNavigator<MainParamList>();


const RootStack = () => {
  const {isAuthenticated,isProfiled,isLoading:authLoading} = useAuth(); 
  const [forceLoading, setForceLoading] = useState(true);
  // Effect to handle the force loading timer
  useEffect(() => {
    console.log('Setting up loading timer for 4 seconds');
    
    // Set a fixed loading time of exactly 10 seconds
    const timer = setTimeout(() => {
      console.log('Timer complete, ending loading state');
      setForceLoading(false);
    }, 4000);
    
    // Clean up function to prevent memory leaks
    return () => {
      console.log('Cleaning up timer');
      clearTimeout(timer);
    };
  }, []); // Empty dependency array means this runs once on mount

  // Show the loading indicator if either auth is loading OR we're forcing loading
  if (authLoading || forceLoading) {
    return <LoadingIndicator size={100} />;
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyle: { backgroundColor: 'transparent' },
        transitionSpec: {
          open: { animation: 'timing', config: { duration: 300 } },
          close: { animation: 'timing', config: { duration: 300 } },
        },
      }}
    >
      {/* Se l'utente è autenticato, mostra il flusso dell'app principale */}
      {!isAuthenticated ? ( <Stack.Screen
            name={Screen.Login}
            component={LoginScreen}/>
    
      ) : !isProfiled ? (
        <Stack.Screen
            name={Screen.CreateProfile}
            component={CreateProfileScreen} // Sostituisci con il tuo componente di modifica profilo
            options={{ animation: 'slide_from_right', animationTypeForReplace: 'push' }}
          />):(
        <>
          <Stack.Screen name={Screen.TabNavigator} component={TabNavigator} />
          <Stack.Screen
            name={Screen.Notifications}
            component={NotificationsScreen}
            options={{ animation: 'slide_from_right', animationTypeForReplace: 'push' }}
          />
         
            <Stack.Screen
            name={Screen.EditProfile}
            component={EditProfileScreen} 
            options={{ animation: 'slide_from_right', animationTypeForReplace: 'push' }}
          />
          <Stack.Screen
            name={Screen.StaffList}
            component={StaffListScreen} 
            options={{ animation: 'slide_from_right', animationTypeForReplace: 'push' }}
          />
          <Stack.Screen
            name={Screen.StaffDetail}
            component={StaffDetailScreen} 
            options={{ animation: 'slide_from_right', animationTypeForReplace: 'push' }}
          />
        
          <Stack.Screen
            name={Screen.AddLinkButton}
            component={AddLinkButtonScreen} 
            options={{ animation: 'slide_from_right', animationTypeForReplace: 'push' }}
          />
          <Stack.Screen
            name={Screen.ResourceDetail}
            component={ResourceDetailScreen} 
            options={{ animation: 'slide_from_right', animationTypeForReplace: 'push' }}
          />
          <Stack.Screen
            name={Screen.AddSubButtons}
            component={AddSubButtonsScreen} 
            options={{ animation: 'slide_from_right', animationTypeForReplace: 'push' }}
          />
          <Stack.Screen
            name={Screen.EditLinkButton}
            component={EditLinkButtonScreen} 
            options={{ animation: 'slide_from_right', animationTypeForReplace: 'push' }}
          />
          <Stack.Screen
            name={Screen.HomePreference}
            component={HomePreferenceScreen} 
            options={{ animation: 'slide_from_right', animationTypeForReplace: 'push' }}
          />
          <Stack.Screen
            name={Screen.ChannelChat}
            component={ChannelChatScreen} 
            options={{ animation: 'slide_from_right', animationTypeForReplace: 'push' }}
          />
          <Stack.Screen
            name={Screen.CreateChannel}
            component={CreateChannelScreen} 
            options={{ animation: 'slide_from_right', animationTypeForReplace: 'push' }}
          />
          <Stack.Screen
            name={Screen.EditChannel}
            component={EditChannelScreen} 
            options={{ animation: 'slide_from_right', animationTypeForReplace: 'push' }}
          />
        </>

      )  
       }
    </Stack.Navigator>
  );
};

export default RootStack;
