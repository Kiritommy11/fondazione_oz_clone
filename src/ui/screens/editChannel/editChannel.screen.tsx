import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { Colors } from '../../../../assets/colors';
import { MainParamList, Screen, UserOption } from '../../navigation/types';
import { db, auth } from '@/src/firebase/firebaseConfig';
import { getAllUsers } from '@/src/firebase/api/user.api';
import { getRolesFromFirestore } from '@/src/firebase/api/roles.api';

import UserDropdown from '../../atoms/userDropdown/userDropdown.atom';
import RoleDropdown from '../../atoms/roleDropdown/roleDropdown.atom';
import { styles } from './editChannel.styles';

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.EditChannel>;
  route: RouteProp<MainParamList, Screen.EditChannel>;
}

const EditChannelScreen = ({ navigation, route}: Props) => {
  const { channelId, channelName } = route.params;
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [userOptions, setUserOptions] = useState<UserOption[]>([]);
  const [allRoles, setAllRoles] = useState<{ label: string; value: string }[]>([]);
  const user = auth.currentUser;
  const currentUserUID = user ? user.uid : '';

  // Funzione per caricare i dati del canale esistente
  const loadChannelData = async () => {
    try {
      const channelRef = doc(db, 'channels', channelId || channelName.toLowerCase());
      const channelSnap = await getDoc(channelRef);
      
      if (channelSnap.exists()) {
        const channelData = channelSnap.data();
        
        // Carica gli utenti e ruoli già selezionati
        if (channelData.allowedUsers) {
          setSelectedUsers(channelData.allowedUsers);
        }
        
        if (channelData.allowedRoles) {
          setSelectedRoles(channelData.allowedRoles);
        }
      }
    } catch (error) {
      console.error('Errore nel caricamento dati canale:', error);
      Alert.alert('Errore', 'Impossibile caricare i dati del canale');
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        // Carica utenti e ruoli
        const [users, roles] = await Promise.all([
          getAllUsers(),
          getRolesFromFirestore()
        ]);

        setAllUsers(users);
        setAllRoles(roles);
        
        // Carica i dati del canale esistente
        await loadChannelData();
        
      } catch (error) {
        console.error('Errore nel recupero dati:', error);
        Alert.alert('Errore', 'Impossibile caricare utenti o ruoli');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [channelId, channelName]);

  useEffect(() => {
    if (allUsers?.length) {
      // Filtra per escludere l'utente loggato dalle opzioni disponibili
      const filteredUsers = allUsers.filter(user => user.uid !== currentUserUID);

      const options = filteredUsers.map((user: any) => ({
        label: user.name || user.email,
        value: user.uid,
        role: user.role || 'utente',
      }));
      setUserOptions(options);

      // Assicurati che l'utente loggato sia sempre incluso nei selezionati
      setSelectedUsers(prevSelected => {
        if (!prevSelected.includes(currentUserUID)) {
          return [...prevSelected, currentUserUID];
        }
        return prevSelected;
      });
    }
  }, [allUsers, currentUserUID]);

  const handleSave = async () => {
    if (selectedRoles.length === 0) {
      Alert.alert('Errore', 'Seleziona almeno un ruolo.');
      return;
    }

    if (selectedUsers.length === 0) {
      Alert.alert('Errore', 'Seleziona almeno un utente.');
      return;
    }

    try {
      const channelRef = doc(db, 'channels', channelId || channelName.toLowerCase());
      
      // Verifica se il canale esiste già
      const channelSnap = await getDoc(channelRef);
      
      const channelData = {
        name: channelName,
        allowedUsers: selectedUsers,
        allowedRoles: selectedRoles,
        updatedAt: new Date(),
      };

      if (channelSnap.exists()) {
        // Aggiorna il canale esistente
        await updateDoc(channelRef, channelData);
        Alert.alert('Successo', 'Canale aggiornato con successo');
      } else {
        // Crea un nuovo canale (fallback)
        await setDoc(channelRef, {
          ...channelData,
          createdAt: new Date(),
        });
        Alert.alert('Successo', 'Canale creato con successo');
      }
      
      navigation.goBack();
    } catch (err) {
      console.error('Errore durante il salvataggio:', err);
      Alert.alert('Errore', 'Errore durante il salvataggio del canale.');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <TopBar onBack={() => navigation.goBack()} onSave={() => {}} title={channelName} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.title}>Caricamento...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopBar onBack={() => navigation.goBack()} onSave={handleSave} title={channelName} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 16 }}>
       
          
          <Text style={styles.title}>Chi può scrivere</Text>
          <UserDropdown
            data={userOptions}
            value={selectedUsers}
            onChange={setSelectedUsers}
            loading={!userOptions.length}
            isFocus={false}
            setIsFocus={() => {}}
          />

          <Text style={styles.title}>Chi riceverà i messaggi</Text>
          <RoleDropdown
            data={allRoles}
            value={selectedRoles}
            onChange={setSelectedRoles}
            isFocus={false}
            setIsFocus={() => {}}
            loading={!allRoles.length}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const TopBar = ({ onBack, onSave, title }: { onBack: () => void; onSave: () => void; title:string;}) => (
  <View style={styles.topBar}>
    <TouchableOpacity onPress={onBack}>
      <Ionicons name="close" size={32} color={Colors.IconColorOnGreen} />
    </TouchableOpacity>
    <Text style={styles.topBarText}>Modifica {title}</Text>
    <TouchableOpacity onPress={onSave}>
      <Ionicons name="checkmark" size={32} color={Colors.IconColorOnGreen} />
    </TouchableOpacity>
  </View>
);

export default EditChannelScreen;