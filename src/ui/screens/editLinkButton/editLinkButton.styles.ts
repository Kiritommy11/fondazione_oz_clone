import { StyleSheet } from 'react-native';
import { Colors } from '../../../../assets/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
    padding: 16,
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
    color: Colors.TextColorOnWhite,
    marginBottom: 16,
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

  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginVertical: 10,
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

  switchContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  switchLabel: {
    fontSize: 16,
    color: Colors.TextColorOnWhite,
  },

  saveButton: {
    backgroundColor: Colors.IconColorOnGreen,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },

  saveButtonText: {
    color: Colors.TextColorOnWhite,
    fontSize: 18,
    fontWeight: 'bold',
  },
   switch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
    content: {
    padding: 16,
  },
});
