import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './profileCard.styles';

interface ProfileCardProps {
  name: string;
  role: string;
  imageUrl: string | { uri: string };
  presenceStatus: boolean;
  onPresencePress?: () => void;
}

const ProfileCard = ({
  name,
  role,
  imageUrl,
  presenceStatus = false,
  onPresencePress = () => {},
}: ProfileCardProps) => (
  <View style={styles.cardContainer}>
    <View style={styles.imageContainer}>
      <Image
        source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
        style={styles.avatar}
      />
      <View style={styles.logoWrapper}>
        <Image
          source={require('../../../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain" // Fa sì che l'immagine si adatti senza tagli
        />
       
      </View>
    </View>

    <View style={styles.profileInfo}>
      <Text style={styles.profileName}>{name}</Text>
      <Text style={styles.profileRole}>{role}</Text>
      <TouchableOpacity onPress={onPresencePress} style={styles.statusButton}>
        <Text style={[styles.statusText, { color: presenceStatus ? 'green' : 'red' }]}>
          {presenceStatus ? 'Online' : 'Offline'}
        </Text>
        <View
            style={[
              styles.presenceDot,
              { backgroundColor: presenceStatus ? 'green' : 'red' },
            ]}
          />
      </TouchableOpacity>
    </View>
  </View>
);

export default ProfileCard;
