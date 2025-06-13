import { StyleSheet } from 'react-native';
import { Colors } from '../../../../assets/colors';

export const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    marginVertical: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  // Messaggio ricevuto
  received: {
    backgroundColor: Colors.BackgroundLightGray,
    alignSelf: 'flex-start',
    borderTopLeftRadius: 4, // Reduced radius for the "tail" effect
  },
  // Messaggio inviato
  sent: {
    backgroundColor: Colors.PrimaryLightGreen,
    alignSelf: 'flex-end',
    borderTopRightRadius: 4, // Reduced radius for the "tail" effect
  },
  senderText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.TextColorDark,
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    color: Colors.TextColorDark,
  },
  dateTimeText: {
    fontSize: 10,
    color: Colors.TextColorGray,
    marginTop: 6,
    textAlign: 'right',
  },
});