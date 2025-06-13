import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
  SafeAreaView,
  Image,
  Alert,
  FlatList,
  Linking,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { styles } from './home.styles';
import { ButtonLinkPromps, MainParamList, Screen,Notification  } from '../../navigation/types';
import ResourceButton from '../../atoms/resourceButton/resourceButton.atom';
import NotificationCard from '../../atoms/notificationCard/notificationCard.atom';
import DotsCarousel from '../../atoms/dotsCarousel/dotsCarousel.atom';
import LoadingIndicator from '../../atoms/loadingIndicator/loadingIndicator.atom';
import PlaceholderButton from '../../atoms/placeholderButton/placeholderButton.atom';
import { useAuth } from '../../../context/authContext.context';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/src/firebase/firebaseConfig';
import { fetchCustomResources } from '@/src/firebase/api/resources.api';
import { getUserProfile } from '@/src/firebase/api/user.api';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.9;

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Home>;
}

const HomeScreen = ({ navigation }: Props) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const { logout } = useAuth();
  const user = auth.currentUser;
const [notifications, setNotifications] = useState<Notification[]>([]);
const [role, setRole] = useState<string | null>(null);

  const [index, setIndex] = useState(0);
  const [loadingResources, setLoadingResources] = useState(true);
const [userButtons, setUserButtons] = useState<(ButtonLinkPromps | undefined)[]>([]);

  const [allResources, setAllResources] = useState<ButtonLinkPromps[]>([]);

 const getUserRole = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      setRole(data.role ?? null);
    }
  } catch (error) {
    console.error('Errore nel recuperare il ruolo:', error);
  }
};
const fetchNotifications = async (uid: string, role: string) => {
  try {
    const channelsSnapshot = await getDocs(collection(db, 'channels'));

    const userChannels = channelsSnapshot.docs.filter(doc => {
      const data = doc.data();
      return data.allowedUsers?.includes(uid) || data.allowedRoles?.includes(role);
    });

    const allMessages: Notification[] = [];

    for (const channelDoc of userChannels) {
      const channelId = channelDoc.id;
      const messagesSnapshot = await getDocs(collection(db, `channels/${channelId}/messages`));

      messagesSnapshot.forEach(messageDoc => {
        const data = messageDoc.data();
        const visualized = data.userSended?.[uid]?.visualized;

        if (!visualized && data.senderId !== uid) {
          allMessages.push({
            id: messageDoc.id,
            message: data.message,
            sender: data.senderName,
            date: new Date(data.timestamp.toDate()).toLocaleDateString(),
            time: new Date(data.timestamp.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            channelId,
            hideCloseIcon: true,
            bgColor: 'transparent',
          });
        }
      });
    }

    allMessages.sort((a, b) => {
      const aDateTime = new Date(`${a.date} ${a.time}`);
      const bDateTime = new Date(`${b.date} ${b.time}`);
      return bDateTime.getTime() - aDateTime.getTime();
    });

    setNotifications(allMessages);
  } catch (error) {
    console.error('Errore nel recuperare le notifiche:', error);
  }
};

useFocusEffect(
  useCallback(() => {
   if (user?.uid && role) {
    fetchNotifications(user.uid, role);
  }
}, [user?.uid, role])
);
useEffect(() => {
  if (user?.uid) {
    getUserRole(user.uid);
  }
}, [user]);

  const fetchUserButtons = async () => {
  if (!user) return;

  try {
   const userData = await getUserProfile(user.uid);
   const buttonIds: (string | null)[] = userData?.buttons || [];

    // Assicura almeno 2 slot
    while (buttonIds.length < 2) {
      buttonIds.push(null);
    }

    // Prendi tutte le risorse disponibili
    const all = await fetchCustomResources(); 
    setAllResources(all);

    // Mappa gli ID salvati ai veri oggetti risorsa
    const resolvedButtons: (ButtonLinkPromps | undefined)[] = buttonIds.map(id =>
      id ? all.find(r => r.id === id) : undefined
    );

    setUserButtons(resolvedButtons);
  } catch (err) {
    console.error('Errore nel recupero dei bottoni utente:', err);
  } finally {
    setLoadingResources(false);
  }
};


  const handleLogout = () => {
    Alert.alert(
      'Conferma Logout',
      'Sei sicuro di voler uscire dall\'app?',
      [
        { text: 'Annulla', style: 'cancel' },
        { text: 'Esci', onPress: logout },
      ],
      { cancelable: true }
    );
  };

  useFocusEffect(useCallback(() => { fetchUserButtons(); }, []));

  useEffect(() => {
  if (notifications.length <= 1) return;

  const interval = setInterval(() => {
    const nextIndex = (index + 1) % notifications.length;
    setIndex(nextIndex);
    scrollViewRef.current?.scrollTo({ x: nextIndex * ITEM_WIDTH, animated: true });
  }, 3000);

  return () => clearInterval(interval);
}, [index, notifications.length]);


  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={handleLogout} style={styles.headerButton}>
          <Ionicons name="log-out-outline" size={34} color="white" />
        </TouchableOpacity>
      ),
      headerTitleAlign: 'center',
      headerTitle: () => (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Image source={require('../../../../assets/icon.png')} style={{ height: 40, aspectRatio: 5240 / 4027, tintColor: 'white', resizeMode: 'contain' }} />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate(Screen.Notifications)} style={styles.headerButton}>
          <Ionicons name="notifications-outline" size={34} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    setIndex(Math.floor(contentOffsetX / ITEM_WIDTH));
  };
 
const renderUserButton = (item: ButtonLinkPromps | undefined, index: number) => {
 const isSingleLink = (item: any): item is ButtonLinkPromps => {
       return 'url' in item && !('buttons' in item);
     };
 
     const handlePress = () => {
  if (!item) return; // <-- Aggiunto controllo per evitare undefined

  if (isSingleLink(item)) {
    Linking.openURL(item.url!);
  } else {
    navigation.navigate(Screen.ResourceDetail, { resource: item });
  }
};


  const handleLongPress = () => {
    navigation.navigate(Screen.HomePreference, { slotIndex: index });
  };

  return (
    <View style={styles.buttonWrapper}>
      {item ? (
        <ResourceButton
          title={item.title}
          icon={item.iconName}
          onPress={handlePress}
          onLongPress={handleLongPress} // Aggiunto
        />
      ) : (
        <PlaceholderButton onPress={handleLongPress} />
      )}
    </View>
  );
};



  return (
    <GestureHandlerRootView style={styles.safeArea}>
      <SafeAreaView style={styles.safeArea}>
        {loadingResources ? (
          <LoadingIndicator size={80} />
        ) : (
          <ScrollView style={{ flex: 1, padding: 16 }} showsVerticalScrollIndicator={false}>
            <View style={styles.carouselOuterContainer}>
              <GestureHandlerRootView style={styles.carouselContainer}>
                <ScrollView
                  ref={scrollViewRef}
                  onScroll={handleScroll}
                  scrollEventThrottle={16}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.scrollViewContent}
                >
                  {notifications.length > 0 ? (
  notifications.map((notification) => (
    <View key={notification.id} style={[styles.notificationSlide, { width: ITEM_WIDTH }]}>
      <NotificationCard {...notification} hideCloseIcon bgColor="transparent" />
    </View>
  ))
) : (
  <View style={[styles.notificationSlide, { width: ITEM_WIDTH, alignItems: 'center', justifyContent: 'center' }]}>
    <NotificationCard
      message="Non ci sono nuove notifiche"
      sender="Sistema"
      date=""
      time=""
      hideCloseIcon
      bgColor="transparent"
    />
  </View>
)}

                </ScrollView>
                <View style={styles.dotsContainer}>
                  <DotsCarousel
                    length={notifications.length}
                    currentIndex={index}
                    setIndex={setIndex}
                    scrollViewRef={scrollViewRef}
                    itemWidth={ITEM_WIDTH}
                    containerStyle={styles.dotsWrapper}
                  />
                </View>
              </GestureHandlerRootView>
            </View>

            <FlatList
              data={[0, 1]}
              keyExtractor={(index) => `slot-${index}`}
              renderItem={({ item: index }) => renderUserButton(userButtons[index], index)}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              scrollEnabled={false}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
              contentContainerStyle={styles.buttonList}
            />
          </ScrollView>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
