import { StyleSheet } from 'react-native';
import { Colors } from '../../../../assets/colors';

export const styles = StyleSheet.create({
 
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 5,
    backgroundColor: Colors.Background, // Imposta il colore di sfondo per la barra superiore
  },
  topBarText: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.TextColorOnGreen, // Colore del testo principale
  },
  // Stili per il container di caricamento
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    color: Colors.TextColorOnGreen,
    fontSize: 16,
  },
  headerButton: {
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  profileContainer: {
  alignItems: 'center',
  marginTop: 32,
},
avatar: {
  width: 100,
  height: 100,
  borderRadius: 50,
  marginBottom: 16,
  backgroundColor: '#ccc',
},
name: {
  fontSize: 20,
  fontWeight: '600',
  marginBottom: 4,
},
role: {
  fontSize: 16,
  color: 'gray',
},


   container: {
    flex: 1,
    backgroundColor: Colors.Background, 
    paddingHorizontal: 0,
    paddingTop: 16,
    paddingBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 16,
    textAlign: 'center',
  },
  
  
  // Stili per la lista degli utenti
  usersListContainer: {
    marginVertical: 15,
    backgroundColor: Colors.Background,
    borderRadius: 8,
    padding: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.TextColorOnGreen,
    marginBottom: 10,
  },
  flatListContent: {
    paddingBottom: 10,
  },
  emptyListText: {
    textAlign: 'center',
    color: Colors.TextColorOnGreen,
    marginVertical: 20,
  },
  
  // Stili per il pulsante di aggiornamento
  buttonRefresh: {
    backgroundColor: Colors.IconColorOnGreen,
    marginTop: 10,
  },
  buttonRefreshText: {
    color: Colors.IconColorOnGreen,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});
