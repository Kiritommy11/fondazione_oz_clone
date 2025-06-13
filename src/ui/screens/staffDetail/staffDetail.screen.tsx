import React, { useCallback, useEffect, useState } from 'react';
import { View, Text,Image, TouchableOpacity, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList, Screen, UserData } from '../../navigation/types';
import { styles } from './staffDetail.styles'; // Ricordati di creare questo file di stile
import { Ionicons } from '@expo/vector-icons';
import { auth , db} from '@/src/firebase/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import ProfileCard from '../../atoms/profileCard/profileCard.atom';
import { Colors } from '@/assets/colors';
import LoadingIndicator from '../../atoms/loadingIndicator/loadingIndicator.atom';

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.StaffDetail>;
  route: RouteProp<MainParamList, Screen.StaffDetail>;
}


const StaffDetailScreen = ({ navigation,route }: Props) => {
 const[userProfile, setUserProfile] = useState<UserData | null>(null);
    const {userId} = route.params; // Ottieni l'ID utente dalla rotta
  const [loading, setLoading] = useState(true);


const fetchUserProfile = async (uid: string) => {
  setLoading(true);
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    setUserProfile({ id: uid, ...snap.data() } as UserData);
  } else {
    Alert.alert('Errore', 'Impossibile caricare il profilo utente.');
  }
  setLoading(false);
};

useFocusEffect(
  useCallback(() => {
    if (userId) {
      fetchUserProfile(userId);
    }
  }, [userId]) // Aggiungi userId come dipendenza
);


  // Determina la sorgente dell'immagine per ProfileCard
  const getImageSource = () => {
  if (userProfile?.photoURL && typeof userProfile.photoURL === 'string') {
    return { uri: userProfile.photoURL };
  }
  return require('../../../../assets/logo.png');
};
const handleGoBack = () => {
 navigation.goBack();
}

  return (
     <SafeAreaView style={styles.container}>
      <TopBar onBack={() => handleGoBack()} onRefresh={()=> fetchUserProfile} />
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <LoadingIndicator size={100} />
          <Text style={styles.loadingText}>Caricamento utente...</Text>
        </View>
      ) : (
  <View style={styles.profileContainer}>
  <ProfileCard
  name={userProfile?.name ?? 'Modifica nome'}
  role={userProfile?.role ?? 'nessuno'}
  imageUrl={getImageSource()}
  presenceStatus={userProfile?.presence ?? false}
  
/>

</View>
)}
      
      
    </SafeAreaView>
  );
};



export default StaffDetailScreen;

const TopBar = ({ onBack, onRefresh }: { onBack: () => void; onRefresh: () => void }) => (
  <View
    style={styles.topBar}
  >
    <TouchableOpacity onPress={onBack}>
      <Ionicons name="arrow-back" size={32} color={Colors.IconColorOnGreen} />
    </TouchableOpacity>
    <Text style={styles.topBarText}>Profilo Utente</Text>
    <TouchableOpacity onPress={onRefresh}>
    <Ionicons name="refresh-outline" size ={32} color={Colors.IconColorOnGreen}/>
        
      </TouchableOpacity>
  </View>
); 