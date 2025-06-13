import React, {  useCallback,  useState } from 'react';
import {
  View, Text, TextInput, Image, TouchableOpacity, SafeAreaView, Alert,
} from 'react-native';

import { styles } from './editProfile.styles';
import { Colors } from '../../../../assets/colors';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { MainParamList, Screen} from '../../navigation/types';
import { useAuth } from '@/src/context/authContext.context';
import * as ImagePicker from 'expo-image-picker';
import { getRolesFromFirestore } from '@/src/firebase/api/roles.api';
import { getUserProfile, updateUserProfile } from '@/src/firebase/api/user.api';

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.EditProfile>;
}



const EditProfileScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Nessuno');
  const [photoURL, setPhotoURL] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const {user} = useAuth();
const [roles, setRoles] = useState<{ label: string; value: string }[]>([]);

 useFocusEffect(
    useCallback(() => {
      if (!user) return;
      const fetchData = async () => {
        const data = await getUserProfile(user.uid);
        if (data) {
          setName(data.name || 'Modifica nome');
          setRole(data.role || 'Nessuno');
          // Se photoURL è già un URL di Cloudinary, lo usiamo direttamente
          if (data.photoURL && typeof data.photoURL === 'string') {
            setPhotoURL(data.photoURL);
          }
        }
          const fetchedRoles = await getRolesFromFirestore();
      setRoles(fetchedRoles);
      };
      fetchData();
    }, [user])
  );

   
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
    const uri = result.assets[0].uri;  // Get the image URI
    try {
      const data = new FormData();
      data.append('file', {
        uri: uri,
        type: 'image/jpg',  // Assicurati che sia il tipo giusto (image/jpeg, image/png, etc.)
        name: 'image.jpg'  // Nome dell'immagine
      } as any);
      data.append('upload_preset', 'usersimage');  // Il tuo preset di upload
      data.append('cloud_name', 'dtr8kosze');  // Il tuo Cloudinary cloud name

      const res = await fetch('https://api.cloudinary.com/v1_1/dtr8kosze/image/upload', {
        method: 'POST',
        body: data,
      });

      const json = await res.json();
      const imageUrl = json.secure_url;  // L'URL sicuro restituito da Cloudinary

      // Salva l'URL dell'immagine su Firebase
      setPhotoURL(imageUrl);
      if (user) {
        await updateUserProfile(user.uid, { photoURL: imageUrl });
      }
      console.log('Immagine caricata su Cloudinary:', imageUrl);
    } catch (error) {
      console.error('Errore nel caricamento su Cloudinary', error);
      Alert.alert('Errore', 'Non è stato possibile caricare l\'immagine');
    }
  }
};


  const handleSave = async () => {
  if (!user) return;
  await updateUserProfile(user.uid, {
    name,
    role,
    photoURL,
  });
  
  if(name===''){
    // Se il nome è vuoto o è il placeholder, mostra un alert
    Alert.alert('Attenzione', 'Non hai inserito il nome');

    return;
  }else{
    Alert.alert('Modifiche salvate con successo');
  handleGoBack();
  }
};
const handleGoBack = () => {
 navigation.goBack();
}

  return (
    <SafeAreaView style={styles.container}>
      <TopBar onBack={() => handleGoBack()} />

      <TouchableOpacity onPress={()=>{pickImage(), console.log('Pick image' + photoURL)}}>
        <Image
  source={photoURL ? { uri: photoURL } : require('../../../../assets/logo.png')}
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
          mode='default'
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
        onPress={()=>{console.log('Save changes'),handleSave()}}
        style={[styles.saveButton, { backgroundColor:  Colors.BackgroundWhite  }]}
        disabled={false}
      >
        <Text style={styles.saveButtonText}>Salva</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditProfileScreen;


    const TopBar = ({ onBack }: { onBack: () => void }) => (
  <View
    style={styles.topBar}
  >
    <TouchableOpacity onPress={onBack}>
      <Ionicons name="arrow-back" size={32} color={Colors.IconColorOnGreen} />
    </TouchableOpacity>
    <Text style={styles.topBarText}>Modifica Profilo</Text>
  </View>
);