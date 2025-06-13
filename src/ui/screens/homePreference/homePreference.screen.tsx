import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useFocusEffect, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { doc, getDoc, getDocs, updateDoc, collection } from 'firebase/firestore';

import { db, auth } from '@/src/firebase/firebaseConfig';
import { MainParamList, Screen, ButtonLinkPromps } from '../../navigation/types';
import { styles } from './homePreference.styles';
import { Colors } from '../../../../assets/colors';
import LoadingIndicator from '../../atoms/loadingIndicator/loadingIndicator.atom';
import { Dropdown } from 'react-native-element-dropdown';
import { getUserProfile, updateUserProfile } from '@/src/firebase/api/user.api';
import { fetchCustomResources } from '@/src/firebase/api/resources.api';

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.HomePreference>;
  route: RouteProp<MainParamList, Screen.HomePreference>;
}

const HomePreferenceScreen = ({ navigation, route }: Props) => {
  const {slotIndex} = route.params;
  const user = auth.currentUser;

  const [allResources, setAllResources] = useState<ButtonLinkPromps[]>([]);
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null);
const [userButtons, setUserButtons] = useState<(ButtonLinkPromps | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFocus, setIsFocus] = useState(false);

const fetchData = async () => {
  if (!user) return;

  try {
    const userData = await getUserProfile(user.uid);
    const buttonIds: (string | null)[] = userData?.buttons || [];

    while (buttonIds.length < 2) {
      buttonIds.push(null);
    }

    const resources = await fetchCustomResources();
    setAllResources(resources);

    const resolvedButtons: (ButtonLinkPromps | null)[] = buttonIds.map(id =>
      id ? resources.find(r => r.id === id) ?? null : null
    );

    setUserButtons(resolvedButtons);
    setSelectedResourceId(resolvedButtons[slotIndex]?.id ?? null);
    setLoading(false);
  } catch (err) {
    console.error('Errore nel caricamento:', err);
    setLoading(false);
  }
};




  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

 const handleSave = async () => {
  if (!user || selectedResourceId === null) return;

  const updatedButtons = [...(userButtons.map(btn => btn?.id ?? null))];
  updatedButtons[slotIndex] = selectedResourceId;
  const sanitizedButtons = updatedButtons.map(id => id ?? null);

  try {
    await updateUserProfile(user.uid, {
      buttons: sanitizedButtons,
      updatedAt: new Date().toISOString(),
    });

    navigation.goBack();
  } catch (err) {
    console.error('Errore salvataggio risorsa:', err);
  }
};




  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <TopBar onBack={handleGoBack} onSave={handleSave} />

        <ScrollView contentContainerStyle={styles.content}>
          {loading ? (
            <View style={{ alignItems: 'center', marginVertical: 10 }}>
              <LoadingIndicator size={30} />
              <Text style={{ color: Colors.TextColorOnWhite, marginTop: 5 }}>
                Caricamento risorse...
              </Text>
            </View>
          ) : (
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              containerStyle={styles.dropdownContainer}
              data={allResources}
              search
              maxHeight={300}
              labelField="title"
              valueField="id"
              placeholder={!isFocus ? "Seleziona una risorsa" : '...'}
              searchPlaceholder="Cerca..."
              value={selectedResourceId}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setSelectedResourceId(item.id);
                setIsFocus(false);
              }}
              renderItem={(item) => (
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                  <Ionicons name={item.iconName as any} size={20} style={{ marginRight: 10 }} />
                  <Text>{item.title}</Text>
                </View>
              )}
              renderLeftIcon={() =>
                selectedResourceId ? (
                  <Ionicons
                    name={
                      allResources.find(r => r.id === selectedResourceId)?.iconName as any
                    }
                    size={20}
                    style={{ marginRight: 10 }}
                  />
                ) : null
              }
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

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

export default HomePreferenceScreen;
