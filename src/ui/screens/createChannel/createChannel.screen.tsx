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
import { collection, doc, setDoc } from 'firebase/firestore';

import { styles } from './createChannel.styles';
import { Colors } from '../../../../assets/colors';
import { MainParamList, Screen, UserOption } from '../../navigation/types';
import { db, auth } from '@/src/firebase/firebaseConfig';
import { getAllUsers } from '@/src/firebase/api/user.api';
import { getRolesFromFirestore } from '@/src/firebase/api/roles.api';

import UserDropdown from '../../atoms/userDropdown/userDropdown.atom';
import RoleDropdown from '../../atoms/roleDropdown/roleDropdown.atom';

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.CreateChannel>;
  route: RouteProp<MainParamList, Screen.CreateChannel>;
}

const CreateChannelScreen = ({ navigation }: Props) => {
  const [channelName, setChannelName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [userOptions, setUserOptions] = useState<UserOption[]>([]);
  const [allRoles, setAllRoles] = useState<{ label: string; value: string }[]>([]);
  const user = auth.currentUser;
  const currentUserUID = user ? user.uid : '';
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const users = await getAllUsers();
        const roles = await getRolesFromFirestore();

        setAllUsers(users);
        setAllRoles(roles);
      } catch (error) {
        console.error('Errore nel recupero dati:', error);
        Alert.alert('Errore', 'Impossibile caricare utenti o ruoli');
      }
    };

    fetchInitialData();
  }, []);

useEffect(() => {
  if (allUsers?.length) {
    // Filtra per escludere l'utente loggato
    const filteredUsers = allUsers.filter(user => user.uid !== currentUserUID);

    const options = filteredUsers.map((user: any) => ({
      label: user.name || user.email,
      value: user.uid,
      role: user.role || 'utente',
    }));
    setUserOptions(options);

    // Aggiungi automaticamente l'utente loggato tra i selezionati (se non già presente)
    setSelectedUsers(prevSelected => {
      if (!prevSelected.includes(currentUserUID)) {
        return [...prevSelected, currentUserUID];
      }
      return prevSelected;
    });
  }
}, [allUsers, currentUserUID]);



 const handleSave = async () => {
  const trimmedName = channelName.trim();

  if (!trimmedName) {
    Alert.alert('Errore', 'Inserisci un nome valido.');
    return;
  }

  if (selectedRoles.length === 0) {
    Alert.alert('Errore', 'Seleziona almeno un ruolo.');
    return;
  }

  try {
    await setDoc(doc(db, 'channels', trimmedName.toLowerCase()), {
      name: trimmedName,
      allowedUsers: selectedUsers,
      allowedRoles: selectedRoles,
      createdAt: new Date(),
    });
    Alert.alert('Successo', 'Canale creato con successo');
    navigation.goBack();
  } catch (err) {
    console.error(err);
    Alert.alert('Errore', 'Errore durante la creazione del canale.');
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <TopBar onBack={() => navigation.goBack()} onSave={handleSave} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 16 }}>
          <Text style={styles.title}>Nome Canale</Text>
          <TextInput
            placeholder="Es. Avvisi"
             placeholderTextColor={Colors.PlaceholderText}
            style={styles.input}
            value={channelName}
            onChangeText={setChannelName}
          />

          <Text style={styles.title}>Chi può scrivere</Text>
          <UserDropdown
            data={userOptions}
            value={selectedUsers}
            onChange={setSelectedUsers}
            loading={!userOptions.length}
             isFocus={false}
              setIsFocus={() => {}}          />

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

const TopBar = ({ onBack, onSave }: { onBack: () => void; onSave: () => void }) => (
  <View style={styles.topBar}>
    <TouchableOpacity onPress={onBack}>
      <Ionicons name="close" size={32} color={Colors.IconColorOnGreen} />
    </TouchableOpacity>
    <Text style={styles.topBarText}>Crea Canale</Text>
    <TouchableOpacity onPress={onSave}>
      <Ionicons name="checkmark" size={32} color={Colors.IconColorOnGreen} />
    </TouchableOpacity>
  </View>
);

export default CreateChannelScreen;
