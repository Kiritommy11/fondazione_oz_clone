import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../../../assets/colors';

const { width } = Dimensions.get('window');
const CAROUSEL_WIDTH = width * 0.9; // 90% of screen width

export const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: Colors.Background, // sfondo generale
    },
    container: {
      flex: 1,
      backgroundColor: Colors.Background, // mantiene colore sfondo
    },
    logoContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: 20,
    },
    logo: {
      height: 150, // aumentato
      aspectRatio: 5240 / 4027,
      resizeMode: 'contain',
        tintColor: Colors.TextColorOnGreen,
    },
    formContainer: {
      flex: 2,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 24,
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 24,
      textAlign: 'center',
    },
    googleButtonContainer: {
      marginTop: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    separatorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 20,
    },
    separator: {
      flex: 1,
      height: 1,
      backgroundColor: '#E0E0E0',
    },
    separatorText: {
      paddingHorizontal: 10,
      color: '#757575',
    },
    loadingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12,
    },
    loadingText: {
      marginLeft: 10,
      color: '#4285F4',
      fontSize: 16,
    },
    
  });