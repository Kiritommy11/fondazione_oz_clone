import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from "../../../../assets/colors";
const { width } = Dimensions.get('window');
const CAROUSEL_WIDTH = width * 0.9; // 90% of screen width
export const styles = StyleSheet.create({
    inputWrapper: {
      width: '100%',
      marginBottom: 16,
    marginVertical: 8,
    },
    input: {
      backgroundColor: '#fff',
      padding: 12,
      borderRadius: 8,
      fontSize: 16,
      flex: 1,
      color: '#333',
    },
   
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: '#fff',
    },
    icon: {
      marginRight: 8,
    },
  });