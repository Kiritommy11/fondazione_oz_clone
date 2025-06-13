import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { doc } from 'firebase/firestore';
import { styles } from './addSubButton.styles';
import { MainParamList, Screen } from '../../navigation/types';
import { Colors } from '@/assets/colors';
import { Dropdown } from 'react-native-element-dropdown';
import { db } from '@/src/firebase/firebaseConfig';
import LoadingIndicator from '../../atoms/loadingIndicator/loadingIndicator.atom';
import { fetchIcons } from '@/src/firebase/api/icons.api';
import { addSubButtonToResource } from '@/src/firebase/api/resources.api';
interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.AddSubButtons>;
  route: RouteProp<MainParamList, Screen.AddSubButtons>;
}

const AddSubButtonsScreen = ({ navigation, route }: Props) => {
   const { resource } = route.params;
  const [title, setTitle] = useState('');
  const [iconName, setIconName] = useState<string | null>(null);
  const [url, setUrl] = useState('');

  const [isFocus, setIsFocus] = useState(false);
const [icons, setIcons] = useState<{label: string; value: string}[]>([]);
  const [loadingIcons, setLoadingIcons] = useState(true);

  useEffect(() => {
  const loadIcons = async () => {
    try {
      const data = await fetchIcons();
      setIcons(data);
    } catch (err) {
      console.error('Errore icone:', err);
    } finally {
      setLoadingIcons(false);
    }
  };

  loadIcons();
}, []);
  



 const handleSave = async () => {
    const isAnyFieldFilled = !!(title || iconName || url);
    const isAllFieldsFilled = !!(title && iconName && url);

    if (isAnyFieldFilled && !isAllFieldsFilled) {
      Alert.alert('Errore', 'Compila tutti i campi del bottone oppure lasciali vuoti');
      return;
    }

    if (!isAllFieldsFilled) {
      Alert.alert('Errore', 'Aggiungi almeno un bottone con tutti i campi completati');
      return;
    }

    try {
      await addSubButtonToResource(resource.id, {
        title,
        iconName: iconName as string,
        url,
      });

      Alert.alert('Successo', 'Bottone aggiunto con successo!');
      setTitle('');
      setIconName(null);
      setUrl('');
      navigation.goBack();
    } catch (err) {
      console.error('Errore salvataggio API:', err);
      Alert.alert('Errore', `Salvataggio fallito: ${err instanceof Error ? err.message : 'Errore sconosciuto'}`);
    }
  };




  const handleGoBack = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.container}>
      <TopBar onBack={handleGoBack} onSave={handleSave}  />

      <ScrollView contentContainerStyle={styles.content}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Titolo bottone"
             placeholderTextColor={Colors.PlaceholderText}
          style={styles.input}
        />

        {loadingIcons ? (
              <View style={{ alignItems: 'center', marginVertical: 10 }}>
                <LoadingIndicator size={30} />
                <Text style={{ color: Colors.TextColorOnWhite, marginTop: 5 }}>Caricamento icone...</Text>
              </View>
            ) : (
            <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          containerStyle={styles.dropdownContainer}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          maxHeight={300}
          placeholder={!isFocus ? "Seleziona un'icona" : '...'}
          searchPlaceholder="Cerca..."
          data={icons}
          labelField="label"
          valueField="value"
          value={iconName}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setIconName(item.value);
            setIsFocus(false);
          }}
          renderItem={(item) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
              <Ionicons name={item.value as any} size={20} style={{ marginRight: 10 }} />
              <Text>{item.label}</Text>
            </View>
          )}
          renderLeftIcon={() =>
            iconName ? (
              <Ionicons name={iconName as any} size={20} style={{ marginRight: 10 }} />
            ) : null
          }
        />
        )}
        <TextInput
          value={url}
          onChangeText={setUrl}
          placeholder="https://..."
             placeholderTextColor={Colors.PlaceholderText}
          style={styles.input}
        />

        
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddSubButtonsScreen;

const TopBar = ({
  onBack,
  onSave,
}: {
  onBack: () => void;
  onSave: () => void;
}) => (
  <View style={styles.topBar}>
    <TouchableOpacity onPress={onBack}>
      <Ionicons name="close" size={32} color={Colors.IconColorOnGreen} />
    </TouchableOpacity>
    <Text style={styles.topBarText}>Aggiungi</Text>
  
      <TouchableOpacity onPress={onSave}>
        <Ionicons name="checkmark" size={32} color={Colors.IconColorOnGreen} />
      </TouchableOpacity>
    </View>

);
