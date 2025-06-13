import { Platform, StatusBar, StyleSheet } from 'react-native';
import { Colors } from '@/assets/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
    paddingTop: Platform.OS==='android' ?  StatusBar.currentHeight:0,
  },

 topBar: {
  height: 56, // altezza fissa
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: Colors.Background,
  paddingHorizontal: 16,
  borderBottomWidth: 1,
  borderBottomColor: Colors.BackgroundGray,
},

chatArea: {
  flex: 1,
},

  topBarText: {
  color: Colors.TextColorOnGreen,
  fontSize: 18,
  fontWeight: '600',
  textAlign: 'center',
  flexShrink: 1, // evita overflow ma non espande
},

topBarContainer: {
  zIndex: 10,
  backgroundColor: Colors.Background,
},

keyboardAvoiding: {
  flex: 1,
},

content: {
  flex: 1,
},

  headerButton: {
    paddingHorizontal: 8,
  },

  messagesList: {
    flex: 1,
    backgroundColor: Colors.BackgroundWhite,
  },

  messagesContent: {
    padding: 12,
  },

inputContainer: {
  flexDirection: 'row',
  alignItems: 'flex-end',
  paddingHorizontal: 12,
  paddingVertical: 8,
  backgroundColor: Colors.BackgroundGray,
  borderTopWidth: 1,
  borderTopColor: Colors.BackgroundLightGray,
},


  input: {
    flex: 1,
    maxHeight: 120,
    backgroundColor: Colors.BackgroundWhite,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: Colors.TextColorDark,
  },

  sendButton: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: Colors.PrimaryLightGreen,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
