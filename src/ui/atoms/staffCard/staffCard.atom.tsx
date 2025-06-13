import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './staffCard.styles';

interface StaffCardProps {
  name: string;
  role: string;
  imageUrl: string | { uri: string };
  presenceStatus: boolean;
  onPress?: () => void;
}

const StaffCard = ({
  name,
  role,
  imageUrl,
  presenceStatus = false,
  onPress = () => {},
}: StaffCardProps) => (
  <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
    <View style={styles.imageContainer}>
      <Image
        source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
        style={styles.avatar}
      />
      <View style={styles.logoWrapper}>
        <Image
          source={require('../../../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>

    <View style={styles.profileInfo}>
      <View style={styles.nameRow}>
        <Text style={styles.profileName}>{name}</Text>
        <View
          style={[
            styles.presenceDot,
            { backgroundColor: presenceStatus ? 'green' : 'red' },
          ]}
        />
      </View>
      <Text style={styles.profileRole}>{role}</Text>
    </View>
  </TouchableOpacity>
);

export default StaffCard;
