import React, { use, useEffect, useState } from 'react';
import {
  View, Text, TextInput, Image, TouchableOpacity, SafeAreaView, Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './createProfile.styles';
import { Colors } from '../../../../assets/colors';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { useAuth } from '@/src/context/authContext.context';
import { getUserProfile, updateUserProfile } from '@/src/firebase/api/user.api';
import { getRolesFromFirestore } from '@/src/firebase/api/roles.api';




const CreateProfileScreen = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Nessuno');
  const [photoURL, setPhotoURL] = useState(require('../../../../assets/logo.png'));
    const [isFocus, setIsFocus] = useState(false);
    const {logout, user, setIsProfiled} = useAuth();
const [roles, setRoles] = useState<{ label: string; value: string }[]>([]);


 useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const data = await getUserProfile(user.uid);
        if (data) {
          setName(data.name || '');
          setRole(data.role || 'Nessuno');
          setPhotoURL(data.photoURL || '');
        }

        const fetchedRoles = await getRolesFromFirestore();
        setRoles(fetchedRoles);
      } catch (error) {
        console.error('Errore durante il caricamento del profilo o dei ruoli:', error);
        Alert.alert('Errore', 'Impossibile caricare i dati del profilo');
      }
    };

    fetchData();
  }, [user]);

const pickImage = async () => {
  // Request permission first
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    alert('Sorry, we need camera roll permissions to make this work!');
    return;
  }

  // Launch image picker
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes:['images'],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
    base64: false, // Set to true if you want base64 representation
  });

  // Check if an image was picked
  if (!result.canceled) {
    // The selected image URI is in result.assets[0].uri
    const selectedImageUri = result.assets[0].uri;
    
    // Update state with the new image URI
    setPhotoURL(selectedImageUri);
  }
};

    const handleNext = async () => {
    if (!user) {
      console.error("No user found");
      return;
    }
    
    if (name.trim() === '') {
      Alert.alert('Attenzione', 'Non hai inserito il nome');
      return;
    }
    
    try {
      console.log("Updating profile for user:", user.uid);
      
      // Update user profile
      await updateUserProfile(user.uid, {
        name,
        role,
        photoURL,
        // Adding a timestamp can help verify when the profile was updated
        updatedAt: new Date().toISOString(),
        isAdmin: role === 'Amministratore',
      });
      
      console.log("Profile updated successfully");
      
      // Critical: Update isProfiled state to true BEFORE navigation occurs
      setIsProfiled(true);
      
      // Success message
      Alert.alert('Successo', 'Profilo aggiornato con successo', [
        { text: 'OK' }
      ]);
      
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert('Errore', 'Si è verificato un errore durante il salvataggio del profilo');
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <TopBar onBack={() => logout()} />

      <TouchableOpacity onPress={pickImage}>
        <Image
          source={typeof photoURL === 'string' ? { uri: photoURL } : photoURL }
          style={styles.avatar}
        />
        <Text style={styles.changePhotoText}>Tocca per cambiare immagine</Text>
      </TouchableOpacity>


      <TextInput
        style={styles.input}
        placeholder="Nome"
         placeholderTextColor={Colors.PlaceholderText}
        value={name}
        onChangeText={setName}
      />

       <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          containerStyle={styles.dropdownContainer}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={roles}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={role}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setRole(item.value);
            setIsFocus(false);
          }}
          />
      <TouchableOpacity
        onPress={()=>{console.log('Save profile'),handleNext()}}
        style={[styles.nextButton, { backgroundColor:  Colors.BackgroundWhite  }]}
        disabled={false}
      >
        <Text style={styles.nextButtonText}>Avanti</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateProfileScreen;


    const TopBar = ({onBack}: { onBack: () => void }) => (
  <View
    style={styles.topBar}
  >
    <TouchableOpacity onPress={onBack}>
      <Ionicons name="arrow-back" size={32} color={Colors.IconColorOnGreen} />
    </TouchableOpacity>
    <Text style={styles.topBarText}>Modifica Profilo</Text>
  </View>
);