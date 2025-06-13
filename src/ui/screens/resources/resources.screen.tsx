import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { View, FlatList, Linking, Image, TouchableOpacity, Text, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ButtonLinkPromps, MainParamList, Screen } from '../../navigation/types';
import { styles } from './resources.styles';
import { Ionicons } from '@expo/vector-icons';
import ResourceButton from '../../atoms/resourceButton/resourceButton.atom';
import { collection, deleteDoc, doc, getDocs, getDoc } from 'firebase/firestore';
import { auth, db } from '@/src/firebase/firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Resources>;
}


const ResourcesScreen = ({ navigation }: Props) => {
  const [customResources, setCustomResources] = useState<any[]>([]);
  const [loadingCustom, setLoadingCustom] = useState<boolean>(true);
  const [editMode, setEditMode] = useState(false);
 const [userRole, setUserRole] = useState<string | null>(null);

  useFocusEffect(
  useCallback(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserRole(data.role);
        }
      }
    };

    fetchUserRole();
  }, [])
);

const handleEdit=(item:any)=>{
 navigation.navigate(Screen.EditLinkButton, { resource: item })

}
  const toggleEditMode = () => {
  setEditMode(prev => !prev);
};
 const renderCustomItem = ({ item }: { item: ButtonLinkPromps }) => {

    const isSingleLink = (item: any): item is ButtonLinkPromps => {
      return 'url' in item && !('buttons' in item);
    };

    const handlePress = () => {
      if (isSingleLink(item)) {
        Linking.openURL(item.url!);
      } else {
        navigation.navigate(Screen.ResourceDetail, { resource: item });
      }
    };

    return (
      
      <View style={styles.buttonWrapper}>
       {editMode && userRole === 'Amministratore' ? (
  <View style={styles.editOverlay}>
    <TouchableOpacity onPress={() => handleEdit(item)}>
      <Ionicons name="pencil" size={24} color="blue" />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => confirmDelete(item.id)}>
      <Ionicons name="trash" size={24} color="red" />
    </TouchableOpacity>
  </View>
) : null}
        <ResourceButton
          title={item.title}
          icon={item.iconName}
          onPress={handlePress}
        />
      </View>
    );
  };
  const confirmDelete = (id: string) => {
    console.log('Deleting resource with ID:', id);
  Alert.alert(
    'Eliminare risorsa',
    'Sei sicuro di voler eliminare questa risorsa?',
    [
      { text: 'Annulla', style: 'cancel' },
      {
        text: 'Elimina',
        onPress: async () => {
          try {
            await deleteDoc(doc(db, 'resources', id));
            setCustomResources(prev => prev.filter(item => item.id !== id));
          } catch (err) {
            console.error('Errore durante la cancellazione:', err);
            Alert.alert('Errore', 'Impossibile eliminare la risorsa.');
          }
        }
      }
    ]
  );
};

  const fetchCustomResources = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'resources'));
    const resourcesData = querySnapshot.docs.map(docSnap => {
      const data = docSnap.data();
      return {
        ...data,
        id: docSnap.id // sovrascrive eventuale campo "id" interno
      };
    });
    setCustomResources(resourcesData);
    console.log('Risorse personalizzate recuperate:', resourcesData);
  } catch (error) {
    console.error('Errore nel recupero delle risorse personalizzate:', error);
  } finally {
    setLoadingCustom(false);
  }
};

  useFocusEffect(
  useCallback(() => {
       setLoadingCustom(true); // per sicurezza
    fetchCustomResources();
  }, [])
);


  useLayoutEffect(() => {
  navigation.setOptions({
    headerLeft: () =>
      userRole === 'Amministratore' ? (
        <TouchableOpacity
          onPress={toggleEditMode}
          style={styles.headerButton}
        >
          <Ionicons
            name={editMode ? 'close' : 'create'}
            size={34}
            color="white"
          />
        </TouchableOpacity>
      ) : null,

    headerRight: () =>
      userRole === 'Amministratore' ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(Screen.AddLinkButton, { collectionName: 'resources' })
          }
          style={styles.headerButton}
        >
          <Ionicons name="add" size={34} color="white" />
        </TouchableOpacity>
      ) : null,

    headerTitleAlign: 'center',
    headerTitle: () => (
      <View style={styles.headerImageWrapper}>
        <Image
          source={require('../../../../assets/icon.png')}
          style={styles.headerImage}
        />
      </View>
    ),
  });
}, [navigation, editMode, userRole]);


  return (
  <View style={styles.container}>
    {!loadingCustom && customResources.length > 0 && (
      <FlatList
        data={customResources.slice(1)}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={renderCustomItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.buttonList}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Primo bottone dalla lista dinamica */}
            <View style={styles.buttonWrapper}>
              {editMode && userRole === 'Amministratore' ? (
                <View style={styles.editOverlay}>
                  <TouchableOpacity onPress={() => handleEdit(customResources[0])}>
                    <Ionicons name="pencil" size={24} color="blue" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => confirmDelete(customResources[0].id)}>
                    <Ionicons name="trash" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              ) : null}
              <ResourceButton
                title={customResources[0].title}
                icon={customResources[0].iconName}
                onPress={() => {
                  const item = customResources[0];
                  const isSingleLink = (item: any): item is ButtonLinkPromps =>
                    'url' in item && !('buttons' in item);

                  if (isSingleLink(item)) {
                    Linking.openURL(item.url!);
                  } else {
                    navigation.navigate(Screen.ResourceDetail, { resource: item });
                  }
                }}
              />
            </View>
            </View>
        }
        ListFooterComponent={
          <View>
            {/* Bottoni statici personalizzati */}
            <View style={styles.buttonWrapper}>
              <ResourceButton
                title="Staff"
                icon="people-outline"
                onPress={() => navigation.navigate(Screen.StaffList)}
              />
              {/* Qui puoi aggiungere altri bottoni statici */}
              {/* <ResourceButton title="Altro" icon="icon-name" onPress={...} /> */}
            </View>

          </View>
        }
      />
    )}
  </View>
);

};

export default ResourcesScreen;
