import { StyleSheet } from 'react-native';
import { Colors } from '../../../../assets/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BackgroundWhite, // sfondo bianco pulito
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.TextColorOnWhite, 
    marginBottom: 16,
    textAlign: 'center',
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
buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 16,

  },
  updateButton: {
  backgroundColor: Colors.Background,
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 12,
  marginTop: 12,
  alignItems: 'center',
},
updateButtonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: '600',
},
fullWidthButton: {
  width: '100%',           // riempi tutta la larghezza
  paddingHorizontal: 16,   // margine interno ai lati
  marginTop: 24,
},
});
