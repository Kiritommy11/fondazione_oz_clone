import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList, Screen } from '../../navigation/types';
import { styles } from './channels.styles';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/src/firebase/firebaseConfig';
import { useAuth } from '@/src/context/authContext.context';
import { Ionicons } from '@expo/vector-icons';
import {auth} from '@/src/firebase/firebaseConfig';

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Channels>;
}

const ChannelsScreen = ({ navigation }: Props) => {
  const { isAdmin } = useAuth();
  const [channels, setChannels] = useState<any[]>([]);
    const user = auth.currentUser;

  useEffect(() => {
    navigation.setOptions({
          headerRight: () =>
      isAdmin ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(Screen.CreateChannel)
          }
          style={styles.headerButton}
        >
          <Ionicons name="add" size={34} color="white" />
        </TouchableOpacity>
      ) : null,
      headerTitleAlign: 'center',
      headerTitle: () => (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Image
            source={require('../../../../assets/icon.png')}
            style={{
              height: 40,
              aspectRatio: 5240 / 4027,
              tintColor: 'white',
              resizeMode: 'contain',
            }}
          />
        </View>
      ),
    });
  }, []);

 useEffect(() => {
  const uid = user?.uid;

  if (!uid) return;

  const channelsRef = collection(db, 'channels');
  const unsubscribe = onSnapshot(channelsRef, (snapshot) => {
    const data = snapshot.docs
      .map((doc) => {
        const channel = doc.data();
        return {
          id: doc.id,
          name: channel.name || doc.id.charAt(0).toUpperCase() + doc.id.slice(1),
          allowedUsers: channel.allowedUsers || [],
        };
      })
      .filter((channel) => isAdmin || channel.allowedUsers.includes(uid)); // 👈 filtro

    setChannels(data);
  }, (error) => {
    Alert.alert('Errore nel caricamento dei canali');
    console.error(error);
  });

  return () => unsubscribe();
}, [isAdmin]);



 if (!channels.length) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nessun canale disponibile</Text>
    </View>
  );
}


  return (
    <View style={styles.container}>
      
      <FlatList
        data={channels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.channelCard}
            onPress={() =>
              navigation.navigate(Screen.ChannelChat, {
                channelId: item.id,
                channelName: item.name,
              })
            }
          >
            <Text style={styles.channelName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ChannelsScreen;
