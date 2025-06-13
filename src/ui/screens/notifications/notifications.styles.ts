import { StyleSheet } from 'react-native';
import { Colors } from '../../../../assets/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background, 
    paddingTop: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  separator: {
    height: 10,
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},

emptyText: {
  fontSize: 40,
  fontWeight:'bold',
  color: Colors.TextColorOnGreen,
  textAlign: 'center',
},

});
