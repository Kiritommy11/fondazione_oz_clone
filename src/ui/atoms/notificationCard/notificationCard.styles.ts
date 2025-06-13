import { StyleSheet } from 'react-native';
import { Colors } from '../../../../assets/colors';

export const styles = StyleSheet.create({
  notificationBox: {
    padding: 16,
    width: '100%',
    borderRadius: 8,
    shadowColor: Colors.TextColorOnWhite,
    shadowOpacity: 0.8,
    minHeight: 80,
    justifyContent: 'center',
    position: 'relative',
  },

  notificationMessage: {
    fontSize: 16,
    color: Colors.TextColorOnWhite,
    textAlign: 'center',
  },

  notificationDateTime: {
    fontSize: 12,
    color: Colors.DateTimeColorOnWhite,
    marginTop: 4,
    textAlign: 'right',
  },

  notificationSender: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.TextColorOnWhite,
    marginBottom: 4,
  },

  closeView: {
    position: 'absolute',
    top: 6,
    right: 8,
    zIndex: 10,

  },
  closeIcon: {
    fontSize: 34,
    tintColor: Colors.IconColorOnWhite,
  },



});
