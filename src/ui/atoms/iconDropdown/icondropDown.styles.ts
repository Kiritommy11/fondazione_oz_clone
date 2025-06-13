import { StyleSheet } from 'react-native';
import { Colors } from '../../../../assets/colors';

export const styles = StyleSheet.create({
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
