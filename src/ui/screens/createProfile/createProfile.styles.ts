import { StyleSheet } from 'react-native';
import { Colors } from '../../../../assets/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background, // Colore di sfondo grigio chiaro
    padding: 16,
  },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.TextColorOnWhite, // Colore del testo
        marginBottom: 16,
    },
    topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    
  },
  label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
  topBarText: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.TextColorOnGreen, // Colore del testo principale
    paddingLeft: 80,
  },
  avatar: {
  width: 100,
  height: 100,
  borderRadius: 50,
  alignSelf: 'center',
  marginTop: 20,
  backgroundColor: '#ccc',
},
changePhotoText: {
  textAlign: 'center',
  marginTop: 8,
  color: Colors.IconColorOnGreen,
},
cameraLink: {
  textAlign: 'center',
  marginBottom: 20,
  color: Colors.IconColorOnGreen,
},
input: {
  backgroundColor: '#fff',
  padding: 12,
  borderRadius: 8,
  fontSize: 16,
  marginVertical: 10,
},
nextButton: {
  padding: 16,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: 20,
},
nextButtonText: {
  color: Colors.TextColorOnWhite,
  fontSize: 18,
  fontWeight: 'bold',
},
dropdown:{
  height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      backgroundColor: Colors.BackgroundWhite,
},
placeholderStyle:{
  fontSize: 16,
  color: Colors.TextColorOnWhite,
},
selectedTextStyle:{
  fontSize: 16,
  color: Colors.TextColorOnWhite,
},
inputSearchStyle:{
  borderRadius: 8,
  height: 40,
  fontSize: 16,
  color: Colors.TextColorOnWhite,
},
iconStyle:{
  width: 20,
  height: 20,
},
dropdownContainer: {
  borderRadius: 8,
  backgroundColor: Colors.BackgroundWhite,
  borderColor: 'gray',
  borderWidth: 0.5,
},


});