import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { doc,  getDoc } from 'firebase/firestore';
import { Colors } from '../../../../assets/colors';
import { MainParamList, Screen } from '../../navigation/types';
import { styles } from './resourceDetail.styles';
import { db } from '@/src/firebase/firebaseConfig';
import LoadingIndicator from '../../atoms/loadingIndicator/loadingIndicator.atom';
import SubButton from '../../atoms/subButton/subButton.atom';


interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.ResourceDetail>;
  route: RouteProp<MainParamList, Screen.ResourceDetail>;
}

const ResourceDetailScreen = ({ navigation, route }: Props) => {
  const { resource } = route.params;
  const [buttons, setButtons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);




  const fetchCustomResources = async () => {
    try {
      const resourceDocRef = doc(db, 'resources', resource.id);
      const docSnap = await getDoc(resourceDocRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        // Se esiste buttons come oggetto, convertiamolo in array
        if (data.buttons && typeof data.buttons === 'object') {
          const buttonsArray = Object.entries(data.buttons).map(
            ([key, value]: [string, any]) => ({
              id: key,
              ...value,
            })
          );
          setButtons(buttonsArray);
        }
      } else {
        console.warn('Documento non trovato');
      }
    } catch (error) {
      console.error('Errore durante il fetch:', error);
    } finally {
      setLoading(false);
    }
  };




useFocusEffect(
  useCallback(() => {
    fetchCustomResources();
  }, [resource.id])
);
 

  const renderItem = ({ item }: { item: any }) => (
    <SubButton
      id={item.id}
      title={item.title}
      iconName={item.iconName}
      onPress={() => Linking.openURL(item.url)}
    />
  );

  const ItemSeparatorComponent = useCallback(
    () => <View style={styles.separator} />,
    []
  );

  const onBack = () => navigation.goBack();

  const onAdd = () => {
    navigation.navigate(Screen.AddSubButtons, {
    resource: resource, // Passa l'intero oggetto
  });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <TopBar title={resource.title} onBack={onBack} onAdd={onAdd} />
        {loading ? (
        <View style={styles.loadingContainer}>
          
          <LoadingIndicator size={100} />
          <Text style={styles.loadingText}>Caricamento...</Text>
        </View>
      ) : (
          <FlatList
            data={buttons}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemSeparatorComponent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ResourceDetailScreen;

const TopBar = ({
  title,
  onBack,
  onAdd,
}: {
  title: string;
  onBack: () => void;
  onAdd: () => void;
}) => (
  <View style={styles.topBar}>
    <TouchableOpacity onPress={onBack}>
      <Ionicons name="arrow-back" size={32} color={Colors.IconColorOnGreen} />
    </TouchableOpacity>
    <Text style={styles.topBarText}>{title}</Text>
    <TouchableOpacity onPress={onAdd}>
      <Ionicons name="add" size={34} color="white" />
    </TouchableOpacity>
  </View>
);
