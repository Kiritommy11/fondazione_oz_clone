import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList, Screen, Notification } from '../../navigation/types';
import { RouteProp } from '@react-navigation/native';
import { styles } from './notifications.styles';
import NotificationCard from '../../atoms/notificationCard/notificationCard.atom';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../../assets/colors';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/src/firebase/firebaseConfig';

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Notifications>;
  route: RouteProp<MainParamList, Screen.Notifications>;
}

const NotificationsScreen = ({ navigation }: Props) => {
  const user = auth.currentUser;
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (user?.uid) {
      getUserRole(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user?.uid && role) {
      fetchNotifications(user.uid, role);
    }
  }, [user, role]);

  const getUserRole = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid)); // Assunto che la collezione sia "users"
      if (userDoc.exists()) {
        const data = userDoc.data();
        if (data.role) {
          setRole(data.role);
        } else {
          console.warn('Ruolo non trovato nel documento utente');
        }
      } else {
        console.warn('Documento utente non trovato');
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
        return (
          data.allowedUsers?.includes(uid) ||
          data.allowedRoles?.includes(role)
        );
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
  });
}

        });
      }
// Dopo aver popolato allMessages
allMessages.sort((a, b) => {
  const aDateTime = new Date(`${a.date} ${a.time}`);
  const bDateTime = new Date(`${b.date} ${b.time}`);
  return bDateTime.getTime() - aDateTime.getTime(); // Ordine decrescente (più recenti prima)
});
      setNotifications(allMessages);
    } catch (error) {
      console.error('Errore nel recupero delle notifiche:', error);
    }
  };

  const markAsRead = async (channelId: string, messageId: string) => {
    try {
      if (!user?.uid) return;

      const messageRef = doc(db, `channels/${channelId}/messages/${messageId}`);
      await updateDoc(messageRef, {
        [`userSended.${user.uid}.visualized`]: true,
      });

      setNotifications(prev => prev.filter(msg => msg.id !== messageId));
    } catch (error) {
      console.error('Errore nel marcare come letto:', error);
    }
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <NotificationCard
      sender={item.sender}
      message={item.message}
      date={item.date}
      time={item.time}
      onClose={() => markAsRead(item.channelId!, item.id)}
      hideCloseIcon={item.hideCloseIcon}
      bgColor={item.bgColor}
    />
  );

 

  return (
    <SafeAreaView style={styles.container}>
      <TopBar onBack={() => navigation.goBack()} onRefresh={() => {
  if (user?.uid && role) {
    fetchNotifications(user.uid, role);
  }
}} />

{notifications.length === 0 ? (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Nessuna nuova notifica</Text>
    </View>
  ) : (
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
      />
  )}
    </SafeAreaView>
  );
};

export default NotificationsScreen;

const TopBar = ({ onBack, onRefresh }: { onBack: () => void; onRefresh: () => void }) => (
  <View style={styles.topBar}>
    <TouchableOpacity onPress={onBack}>
      <Ionicons name="arrow-back" size={32} color={Colors.IconColorOnGreen} />
    </TouchableOpacity>
    <Text style={styles.topBarText}>Notifiche</Text>
    <TouchableOpacity onPress={onRefresh}>
      <Ionicons name="refresh" size={32} color={Colors.IconColorOnGreen} />
    </TouchableOpacity>
  </View>
);

