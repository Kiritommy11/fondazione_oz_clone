import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { styles } from './addLinkButton.styles';
import { MainParamList, Screen } from '../../navigation/types';
import { Colors } from '@/assets/colors';
import LoadingIndicator from '../../atoms/loadingIndicator/loadingIndicator.atom';
import { fetchIcons } from '@/src/firebase/api/icons.api';
import IconDropdown from '../../atoms/iconDropdown/iconDropdown.atom';
import { saveLinkButton } from '../../service/addLinkButton.service';
interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.AddLinkButton>;
  route: RouteProp<MainParamList, Screen.AddLinkButton>;
}

const AddLinkButtonScreen = ({ navigation, route }: Props) => {
  const { collectionName } = route.params;
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [iconName, setIconName] = useState<string | null>(null);
  const [createCollection, setCreateCollection] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [showSubButtonInputs, setShowSubButtonInputs] = useState(false);

  // Stato per il bottone secondario
  const [subTitle, setSubTitle] = useState('');
  const [subIcon, setSubIcon] = useState<string | null>(null);
const [isSubFocus, setIsSubFocus] = useState(false);
  const [subUrl, setSubUrl] = useState('');

 const [icons, setIcons] = useState<{label: string; value: string}[]>([]);
  const [loadingIcons, setLoadingIcons] = useState(true);

 useEffect(() => {
  const loadIcons = async () => {
    try {
      const iconsData = await fetchIcons();
      setIcons(iconsData);
    } catch (error) {
      // L'errore è già loggato nella funzione API
    } finally {
      setLoadingIcons(false);
    }
  };

  loadIcons();
}, []);


  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSave = () => {
  saveLinkButton({
  collectionName,
  title,
  url,
  iconName,
  createCollection,
  subTitle,
  subIcon, // deve essere questo, non iconName
  subUrl,
  navigation,
});

};



  return (
    <SafeAreaView style={styles.container}>
      <TopBar onBack={handleGoBack} onSave={handleSave} />

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
  <IconDropdown
  icons={icons}
  value={iconName}
  onChange={setIconName}
  isFocus={isFocus}
  setIsFocus={setIsFocus}
  loading={loadingIcons}
/>


 )}


        {!createCollection && (
          <TextInput
            value={url}
            onChangeText={setUrl}
            placeholder="https://..."
            placeholderTextColor={Colors.PlaceholderText}
            style={styles.input}
          />
        )}

        <View style={styles.switchContainer}>
          <TouchableOpacity onPress={() => setCreateCollection(!createCollection)} style={styles.switch}>
            <Ionicons name={createCollection ? 'checkbox' : 'square-outline'} size={24} />
            <Text style={styles.switchLabel}>Crea nuova collezione</Text>
          </TouchableOpacity>
        </View>

        {createCollection && !showSubButtonInputs && (
          <TouchableOpacity
            onPress={() => setShowSubButtonInputs(true)}
            style={{
              marginTop: 20,
              padding: 12,
              backgroundColor: Colors.BackgroundWhite,
              borderRadius: 10,
              width: '100%',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: Colors.TextColorOnWhite, fontWeight: '600', fontSize: 16 }}>+ Aggiungi bottone</Text>
          </TouchableOpacity>
        )}

        {createCollection && showSubButtonInputs && (
          <View style={{ marginTop: 20 }}>
            <TextInput
              value={subTitle}
              onChangeText={setSubTitle}
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
            <IconDropdown
  icons={icons}
  value={subIcon}
  onChange={setSubIcon}
  isFocus={isSubFocus}
  setIsFocus={setIsSubFocus}
  loading={loadingIcons}
/>


            )}

            <TextInput
              value={subUrl}
              onChangeText={setSubUrl}
              placeholder="https://..."
               placeholderTextColor={Colors.PlaceholderText}
              style={styles.input}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddLinkButtonScreen;

const TopBar = ({ onBack, onSave }: { onBack: () => void; onSave: () => void }) => (
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
