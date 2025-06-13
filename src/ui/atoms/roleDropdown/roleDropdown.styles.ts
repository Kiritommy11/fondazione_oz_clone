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
  itemContainer: {
    padding: 10,
    
  },
  itemLabel: {
    fontSize: 16,
    color: Colors.TextColorOnWhite,
  },
    selectedItemContainer: {
  backgroundColor: Colors.BackgroundWhite,
  borderRadius: 12,
  paddingVertical: 6,
  paddingHorizontal: 10,
  margin: 4,
  flexDirection: 'row',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 3, // per Android
},

selectedItemText: {
  color: '#000',
  fontSize: 14,
  marginRight: 8,
},

removeIcon: {
  fontSize: 16,
},
});
