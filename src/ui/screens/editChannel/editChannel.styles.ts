import { StyleSheet } from 'react-native';
import { Colors } from '../../../../assets/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background, // Grigio chiaro o colore di sfondo scelto
   paddingTop: 20,
  },

 
    topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: Colors.Background, // Imposta il colore di sfondo per la barra superiore
  },
  topBarText: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.TextColorOnGreen, // Colore del testo principale
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.TextColorOnGreen,
    marginBottom: 16,
  },

  input: {
    backgroundColor: Colors.BackgroundWhite,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: Colors.TextColorOnWhite,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },

  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.BackgroundWhite,
    marginBottom: 16,
  },

  dropdownContainer: {
    borderRadius: 8,
    backgroundColor: Colors.BackgroundWhite,
    borderColor: '#ccc',
    borderWidth: 1,
  },

  placeholderStyle: {
    fontSize: 16,
    color: '#888',
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
    paddingHorizontal: 10,
  },

  iconStyle: {
    width: 20,
    height: 20,
  },

  nextButton: {
    backgroundColor: Colors.IconColorOnGreen,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },

  nextButtonText: {
    color: Colors.TextColorOnWhite,
    fontSize: 16,
    fontWeight: '600',
  },
});
