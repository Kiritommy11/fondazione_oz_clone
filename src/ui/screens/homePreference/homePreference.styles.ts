import { StyleSheet } from 'react-native';
import { Colors } from '@/assets/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
    padding: 16,
  },

  content: {
    paddingVertical: 24,
    paddingHorizontal: 8,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: Colors.Background,
  },

  topBarText: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.TextColorOnGreen,
  },

dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: Colors.BackgroundWhite,
    marginVertical: 10,
  },

  dropdownContainer: {
    borderRadius: 8,
    backgroundColor: Colors.BackgroundWhite,
    borderColor: 'gray',
    borderWidth: 0.5,
  },

  placeholderStyle: {
    fontSize: 16,
    color: Colors.TextColorOnWhite,
  },

  selectedTextStyle: {
    fontSize: 16,
    color: Colors.TextColorOnWhite,
  },

  inputSearchStyle: {
    borderRadius: 8,
    height: 40,
    fontSize: 16,
    color: Colors.TextColorOnWhite,
  },

  iconStyle: {
    width: 20,
    height: 20,
  },
});
