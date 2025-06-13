import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { collection, addDoc, onSnapshot, orderBy, query, doc, getDoc, getDocs } from 'firebase/firestore';
import { auth, db } from '@/src/firebase/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './channelChat.styles';
import MessageCard from '../../atoms/messageCard/messageCard.atom';
import { Colors } from '@/assets/colors';
import { MainParamList, Screen } from '../../navigation/types';

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.ChannelChat>;
  route: RouteProp<MainParamList, Screen.ChannelChat>;
}

const ChannelChatScreen = ({ navigation, route }: Props) => {
  const { channelId, channelName } = route.params;
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [userName, setUserName] = useState<string>('Anonimo');

  const user = auth.currentUser;
useEffect(() => {
  const fetchUserName = async () => {
    if (!user) return;
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        setUserName(data?.name || 'Anonimo');
      }
    } catch (error) {
      console.error('Errore nel recupero nome utente:', error);
    }
  };

  fetchUserName();
}, [user]);

  useEffect(() => {
    const q = query(
      collection(db, 'channels', channelId, 'messages'),
      orderBy('timestamp', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(data);
    });
    return () => unsubscribe();
  }, [channelId]);

const handleSend = async () => {
  if (!input.trim() || !user) return;

  try {
    // 1. Recupera i dati del canale
    const channelRef = doc(db, 'channels', channelId);
    const channelSnap = await getDoc(channelRef);

    if (!channelSnap.exists()) {
      console.error('Canale non trovato');
      return;
    }

    const channelData = channelSnap.data();
    const allowedRoles = channelData?.allowedRoles || [];
    const allowedUsers = channelData?.allowedUsers || [];

    if (allowedRoles.length === 0 && allowedUsers.length === 0) {
      console.warn('Nessun ruolo o utente ammesso trovato');
    }

    // 2. Trova tutti gli utenti da notificare
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const userSended: Record<string, { visualized: boolean; name: string }> = {};


    usersSnapshot.forEach((docSnap) => {
      const userId = docSnap.id;
      const userData = docSnap.data();

      const hasAllowedRole = allowedRoles.includes(userData.role);
      const isExplicitlyAllowed = allowedUsers.includes(userId);
      const isNotCurrentUser = userId !== user.uid;

      if ((hasAllowedRole || isExplicitlyAllowed) && isNotCurrentUser) {
        userSended[userId] = {
  visualized: false,
  name: userData.name || 'Anonimo',
};

      }
    });

    // 3. Aggiungi il messaggio
    await addDoc(collection(db, 'channels', channelId, 'messages'), {
  message: input.trim(),
  senderName: userName,
  senderId: user.uid, // 👈 aggiungi questo campo
  userSended,
  timestamp: new Date(),
});


    setInput('');
  } catch (error) {
    console.error("Errore durante l'invio del messaggio:", error);
  }
};




  const renderItem = 
    ({ item }: { item: any }) => {
      const timestamp = item.timestamp ? new Date(item.timestamp.seconds * 1000) : new Date();
      
      return (
        <MessageCard
          message={item.message}
          sender={item.senderName}
          date={timestamp.toLocaleDateString()}
          time={timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          isSent={item.senderName === userName}


        />
      );
    }

  const handleAddUser = () => {
    navigation.navigate(Screen.EditChannel, {
      channelId,
      channelName,
    });
  }
  return (
  <SafeAreaView style={styles.container}>
    {/* TopBar fissa, NON dentro KeyboardAvoidingView */}
    <TopBar onBack={navigation.goBack} title={channelName} onAdd={handleAddUser} />

    {/* Contenitore adattabile con la tastiera */}
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <View style={{ flex: 1 }}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          inverted
          keyboardShouldPersistTaps="handled"
        />

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Scrivi un messaggio..."
            placeholderTextColor={Colors.PlaceholderText}
            style={styles.input}
            value={input}
            onChangeText={setInput}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            onPress={() => {
              handleSend();
              Keyboard.dismiss();
            }}
            style={styles.sendButton}
          >
            <Ionicons name="send" size={24} color={Colors.IconColorOnGreen} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  </SafeAreaView>
);

};

export default ChannelChatScreen;

const TopBar = ({
  onBack,
  title,
  onAdd = () => { /* Default no-op */ },
}: {
  onBack: () => void;
  onAdd: () => void;
  title: string;
}) => (
  <View style={styles.topBar}>
    <TouchableOpacity onPress={onBack} style={styles.headerButton}>
      <Ionicons name="arrow-back" size={28} color={Colors.IconColorOnGreen} />
    </TouchableOpacity>
    <Text style={styles.topBarText}>{title}</Text>
    <TouchableOpacity onPress={onAdd} style={styles.headerButton}>
      <Ionicons name="person-add" size={28} color={Colors.IconColorOnGreen} />
    </TouchableOpacity>
  </View>
);