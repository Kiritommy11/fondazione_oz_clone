import React, { useCallback, useEffect, useState } from 'react';
import { View, Text,Image, TouchableOpacity, Alert, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList, Screen, UserData } from '../../navigation/types';
import { styles } from './profile.styles'; // Ricordati di creare questo file di stile
import { Ionicons } from '@expo/vector-icons';
import { auth } from '@/src/firebase/firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';
import ProfileCard from '../../atoms/profileCard/profileCard.atom';
import * as Updates from 'expo-updates';
import { getUserProfile, updateUserProfile } from '@/src/firebase/api/user.api';

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Profile>; // cambia "Template" con il nome effettivo della schermata
}


const ProfileScreen = ({ navigation }: Props) => {
 const[userProfile, setUserProfile] = useState<UserData | null>(null);
 const [updateAvailable, setUpdateAvailable] = useState(false);
const [checkingUpdate, setCheckingUpdate] = useState(false);

    const user = auth.currentUser;
useEffect(()=>{
  handleCheckUpdate
})
const {
    isUpdatePending
  } = Updates.useUpdates();

  useEffect(() => {
    if (isUpdatePending) {
      // Update has successfully downloaded; apply it now
      Updates.reloadAsync();
    }
  }, [isUpdatePending]);

 

const fetchUserProfile = async (uid: string) => {
  try {
    const data = await getUserProfile(uid);
    if (data) {
      setUserProfile({ id: uid, ...data } as UserData);
    } else {
      Alert.alert('Errore', 'Impossibile caricare il profilo utente.');
    }
  } catch (error) {
    console.error('Errore caricamento profilo:', error);
    Alert.alert('Errore', 'Errore durante il caricamento del profilo.');
  }
};


useFocusEffect(
  useCallback(() => {
    if (user?.uid) {
      fetchUserProfile(user.uid);
    }
  }, [user])
);

const handleCheckUpdate = async () => {
  try {
    setCheckingUpdate(true);
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      setUpdateAvailable(true);
    } else {
      Alert.alert('Nessun aggiornamento', 'L\'app è già aggiornata.');
    }
  } catch (error) {
    console.error('Errore controllo aggiornamenti:', error);
    Alert.alert('Errore', 'Impossibile controllare aggiornamenti.');
  } finally {
    setCheckingUpdate(false);
  }
};
const handleDownloadUpdate = async () => {
  try {
    const result = await Updates.fetchUpdateAsync();
    if (result.isNew) {
      await Updates.reloadAsync();
    }
  } catch (error) {
    console.error('Errore scaricamento aggiornamento:', error);
    Alert.alert('Errore', 'Impossibile scaricare aggiornamento.');
  }
};

  React.useEffect(() => {
    navigation.setOptions({
      
      headerTitleAlign: 'center',
      headerTitle: () => (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Image
            source={require('../../../../assets/icon.png')}
            style={{
              height: 40, // altezza ideale per header
              aspectRatio: 5240 / 4027, // mantiene proporzioni reali
              tintColor: 'white',
              resizeMode: 'contain',
            }}
          />
        </View>
      ),
       headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate(Screen.EditProfile)} style={styles.headerButton}>
          <Ionicons name="create-outline" size={34} color="white" />
        </TouchableOpacity>
      ),
    });
  }, []);
  // Determina la sorgente dell'immagine per ProfileCard
  const getImageSource = () => {
  if (userProfile?.photoURL && typeof userProfile.photoURL === 'string') {
    return { uri: userProfile.photoURL };
  }
  return require('../../../../assets/logo.png');
};


  return (
  <View style={styles.profileContainer}>
  <ProfileCard
  name={userProfile?.name ?? 'Modifica nome'}
  role={userProfile?.role ?? 'nessuno'}
  imageUrl={getImageSource()}
  presenceStatus={userProfile?.presence ?? false}
  onPresencePress={async() =>  {
    const newPresence = !(userProfile?.presence ?? false);
    if (user) {
      await updateUserProfile(user.uid, { presence: newPresence });
      setUserProfile(prev => prev ? { ...prev, presence: newPresence } : null);
    }
  }}
/>

 {!updateAvailable ? (
  <TouchableOpacity style={styles.updateButton} onPress={handleCheckUpdate} disabled={checkingUpdate}>
    <Text style={styles.updateButtonText}>
      {checkingUpdate ? 'Controllo in corso...' : 'Controlla aggiornamenti manualmente'}
    </Text>
  </TouchableOpacity>
) : (
  <TouchableOpacity style={styles.updateButton} onPress={handleDownloadUpdate}>
    <Text style={styles.updateButtonText}>Scarica e applica aggiornamento</Text>
  </TouchableOpacity>
)}


</View>
  );
};

export default ProfileScreen;
