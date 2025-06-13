import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert,
} from 'react-native';
import { Colors } from '../../../../assets/colors';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { MainParamList , Screen} from '../../navigation/types';
import { db } from '@/src/firebase/firebaseConfig';
import {  collection, getDocs } from 'firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import { styles } from './staffList.styles';
import StaffCard from '../../atoms/staffCard/staffCard.atom';
import LoadingIndicator from '../../atoms/loadingIndicator/loadingIndicator.atom';


interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.StaffList>;
  route: RouteProp<MainParamList, Screen.StaffList>;
}

interface UserData {
  id: string;
  name: string;
  role: string;
  photoURL: string;
  presence: boolean;
}

const StaffListScreen = ({ navigation }: Props) => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
    

// Fetch all users from Firestore
const fetchAllUsers = async () => {
  try {
    setLoading(true);
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    
    const fetchedUsers: UserData[] = [];
    snapshot.forEach((doc) => {
      const userData = doc.data();
      const photo= userData.photoURL;
      fetchedUsers.push({
        id: doc.id,
        name: userData.name,
        role: userData.role,
        photoURL: typeof photo === 'string' && photo.trim() !== ''
      ? photo
      : require('../../../../assets/logo.png'),
        presence: userData.presence 
      });
    });
    
    setUsers(fetchedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    Alert.alert('Errore', 'Impossibile caricare gli utenti.');
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchAllUsers();
}, []);

const handleGoBack = () => {
 navigation.goBack();
}

const staffItem = ({ item }: { item: UserData }) => (
 
    <StaffCard
     name={item.name}
    role={item.role}
    imageUrl={typeof item.photoURL === 'string' ? { uri: item.photoURL } : item.photoURL}
    presenceStatus={item.presence}
      onPress={() => {
        console.log('User Pressed', item.id);
        navigation.navigate(Screen.StaffDetail, { userId: item.id });
      }
      }
    />
          
  
);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar onBack={() => handleGoBack()} onRefresh={()=> {fetchAllUsers(),setLoading(true)}} />
      
      {loading ? (
        <View style={styles.loadingContainer}>
          
          <LoadingIndicator size={100} />
          <Text style={styles.loadingText}>Caricamento utenti...</Text>
        </View>
      ) : (
        <View style={styles.usersListContainer}>
          
          <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={staffItem}
            ListEmptyComponent={
              <Text style={styles.emptyListText}>Nessun utente trovato</Text>
            }
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      )}
      
      
      
    </SafeAreaView>
  );
};

export default StaffListScreen;


const TopBar = ({ onBack, onRefresh }: { onBack: () => void; onRefresh: () => void }) => (
  <View
    style={styles.topBar}
  >
    <TouchableOpacity onPress={onBack}>
      <Ionicons name="arrow-back" size={32} color={Colors.IconColorOnGreen} />
    </TouchableOpacity>
    <Text style={styles.topBarText}>Staff</Text>
    <TouchableOpacity onPress={onRefresh}>
    <Ionicons name="refresh-outline" size ={32} color={Colors.IconColorOnGreen}/>
        
      </TouchableOpacity>
  </View>
); 