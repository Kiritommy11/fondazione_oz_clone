import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../../../assets/colors";
const { width } = Dimensions.get('window');
const CAROUSEL_WIDTH = width * 0.9; // 90% of screen width
export const styles = StyleSheet.create({
    button: {
      backgroundColor: Colors.Background,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 16,
      width: CAROUSEL_WIDTH,
    },
    buttonText: {
      color: Colors.TextColorOnGreen,
      fontSize: 24,
      fontWeight: 'bold',
    },
  });