// components/atoms/notificationCard/notificationCard.atom.tsx
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './notificationCard.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../../assets/colors';

interface NotificationCardProps {
  message: string;
  sender: string;
  date: string;
  time: string;
  onClose?: () => void;
  hideCloseIcon?: boolean; // Nuova prop per nascondere l'icona di chiusura
  bgColor?: string; // Nuova prop per modificare il colore di sfondo 
}

const NotificationCard = ({
  message,
  sender,
  date,
  time,
  onClose,
  hideCloseIcon = false, // Valore predefinito per nascondere l'icona di chiusura
  bgColor = Colors.BackgroundWhite, // Valore predefinito per il colore di sfondo
}: NotificationCardProps) => (
  <View style={[styles.notificationBox, { backgroundColor: bgColor }]}>
    {!hideCloseIcon && (
      <View style={styles.closeView}>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="eye" style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
    )}
    <Text style={styles.notificationSender}>Da: {sender}</Text>
    <Text style={styles.notificationMessage}>{message}</Text>
    <Text style={styles.notificationDateTime}>
      {date} - {time}
    </Text>
  </View>
);

export default NotificationCard;
