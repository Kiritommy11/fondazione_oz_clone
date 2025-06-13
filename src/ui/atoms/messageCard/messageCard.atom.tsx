import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './messageCard.styles'; // Make sure this path is correct

interface MessageCardProps {
  message: string;
  sender: string;
  date: string;
  time: string;
  isSent: boolean;
}

const MessageCard: React.FC<MessageCardProps> = ({
  message,
  sender,
  date,
  time,
  isSent
}) => {
  return (
    <View style={[
      styles.container,
      isSent ? styles.sent : styles.received
    ]}>
      {!isSent && sender && (
  <Text style={styles.senderText}>
    {sender || 'Mittente sconosciuto'}
  </Text>
)}

      <Text style={styles.messageText}>
        {message}
      </Text>
      <Text style={styles.dateTimeText}>
        {date}    {time}
      </Text>
    </View>
  );
};

export default MessageCard;