import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { doc, updateDoc } from 'firebase/firestore';
import { styles } from './editLinkButton.styles'; // riusa gli stili esistenti
import { MainParamList, Screen } from '../../navigation/types';
import { Colors } from '@/assets/colors';
import { Dropdown } from 'react-native-element-dropdown';
import { db } from '@/src/firebase/firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import LoadingIndicator from '../../atoms/loadingIndicator/loadingIndicator.atom';
import { fetchIconsFromFirestore } from '@/src/firebase/api/icons.api';

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.EditLinkButton>;
  route: RouteProp<MainParamList, Screen.EditLinkButton>;
}

const EditLinkButtonScreen = ({ navigation, route }: Props) => {
  const { resource } = route.params;
  const [title, setTitle] = useState(resource.title);
  const [url, setUrl] = useState(resource.url || '');
  const [iconName, setIconName] = useState<string | null>(resource.iconName);
  const [createCollection] = useState(!!resource.buttons);
  const [subButtons, setSubButtons] = useState(resource.buttons || {});
  const [icons, setIcons] = useState<{ label: string; value: string }[]>([]);
  const [loadingIcons, setLoadingIcons] = useState(true);

  useEffect(() => {
    const loadIcons = async () => {
      try {
        const data = await fetchIconsFromFirestore();
        setIcons(data);
      } catch (error) {
        console.error('Errore nel caricamento delle icone:', error);
        Alert.alert('Errore', 'Impossibile caricare le icone');
      } finally {
        setLoadingIcons(false);
      }
    };

    loadIcons();
  }, []);

  const handleSave = async () => {
    if (!title || !iconName) {
      Alert.alert('Errore', 'Titolo e icona sono obbligatori.');
      return;
    }

    try {
      const updatedData = {
        title,
        iconName,
        ...(createCollection ? { buttons: subButtons } : { url }),
      };

      await updateResource(resource.id, updatedData);
      Alert.alert('Modifica salvata con successo');
      navigation.goBack();
    } catch (error) {
      console.error('Errore durante il salvataggio:', error);
      Alert.alert('Errore', 'Impossibile salvare le modifiche.');
    }
  };

  const handleSubButtonChange = (key: string, field: 'title' | 'url' | 'iconName', value: string) => {
    setSubButtons(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const renderSubButtons = () => {
    return Object.entries(subButtons).map(([key, btn]) => (
      <View key={key} style={{ marginTop: 16 }}>
        <TextInput
          value={btn.title}
          onChangeText={(text) => handleSubButtonChange(key, 'title', text)}
          placeholder="Titolo bottone"
           placeholderTextColor={Colors.PlaceholderText}
          style={styles.input}
        />
        {loadingIcons ? (
          <LoadingIndicator />
        ) : (
          <Dropdown
            data={icons}
            labelField="label"
            valueField="value"
            value={btn.iconName}
            onChange={(item) => handleSubButtonChange(key, 'iconName', item.value)}
            renderLeftIcon={() =>
              btn.iconName ? (
                <Ionicons name={btn.iconName as any} size={20} style={{ marginRight: 10 }} />
              ) : null
            }
            style={styles.dropdown}
            placeholder={!btn.iconName ? 'Seleziona icona' : ''}
          />
        )}
        <TextInput
          value={btn.url}
          onChangeText={(text) => handleSubButtonChange(key, 'url', text)}
          placeholder="https://..."
           placeholderTextColor={Colors.PlaceholderText}
          style={styles.input}
        />
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar onBack={() => navigation.goBack()} onSave={handleSave} />

      <ScrollView contentContainerStyle={styles.content}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Titolo"
           placeholderTextColor={Colors.PlaceholderText}
          style={styles.input}
        />

        {loadingIcons ? (
          <LoadingIndicator />
        ) : (
          <Dropdown
            data={icons}
            labelField="label"
            valueField="value"
            value={iconName}
            onChange={(item) => setIconName(item.value)}
            renderLeftIcon={() =>
              iconName ? (
                <Ionicons name={iconName as any} size={20} style={{ marginRight: 10 }} />
              ) : null
            }
            style={styles.dropdown}
            placeholder={!iconName ? 'Seleziona icona' : ''}
          />
        )}

        {!createCollection ? (
          <TextInput
            value={url}
            onChangeText={setUrl}
            placeholder="https://..."
             placeholderTextColor={Colors.PlaceholderText}
            style={styles.input}
          />
        ) : (
          renderSubButtons()
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditLinkButtonScreen;

const TopBar = ({ onBack, onSave }: { onBack: () => void; onSave: () => void }) => (
  <View style={styles.topBar}>
    <TouchableOpacity onPress={onBack}>
      <Ionicons name="close" size={32} color={Colors.IconColorOnGreen} />
    </TouchableOpacity>
    <Text style={styles.topBarText}>Modifica</Text>
    <TouchableOpacity onPress={onSave}>
      <Ionicons name="checkmark" size={32} color={Colors.IconColorOnGreen} />
    </TouchableOpacity>
  </View>
);
function updateResource(id: string, updatedData: { buttons: Record<string, { title: string; iconName: string; url: string; }>; title: string; iconName: string; } | { url: string; title: string; iconName: string; }) {
  throw new Error('Function not implemented.');
}

