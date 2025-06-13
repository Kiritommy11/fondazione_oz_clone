import { Colors } from '@/assets/colors';
import { StyleSheet, Dimensions } from 'react-native';

const { width} = Dimensions.get('window');
const CAROUSEL_WIDTH = width * 0.9; // 90% of screen width
export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.BackgroundWhite,
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerButton: {
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  carouselOuterContainer: {
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  carouselContainer: {
    width: CAROUSEL_WIDTH,
    paddingVertical: 10,
  },
  
  scrollViewContent: {
    alignItems: 'center',
  },
  notificationSlide: {
    justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 10,
  width: CAROUSEL_WIDTH, 
  },
  notificationBox: {
    padding: 16,
  width: '100%',
  
  minHeight: 80, // ✅ Imposta una minHeight ma non fissa l’altezza
  justifyContent: 'center',
  },
  notificationMessage: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  notificationDateTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    textAlign: 'right',
  },
  notificationSender: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  
  dotsContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  dotsWrapper: {
    alignItems: 'center',
    borderRadius: 12,
    height: 24,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  restOfContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  contentPlaceholder: {
    fontSize: 16,
    color: '#666',
  },
 
  separator: {
    height: 5,
  },
  buttonContainer: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  buttonWrapper: {
    flexBasis: '48%',
    marginHorizontal: '1%',
  },
  buttonList: {
    paddingVertical: 20,
  },
  placeholderButton: {
  borderWidth: 2,
  borderColor: '#999',
  borderStyle: 'dashed',
  backgroundColor: 'transparent',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  borderRadius: 8,
},
placeholderText: {
  marginTop: 8,
  color: '#666',
  fontSize: 16,
},
  homeButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  homeButtonWrapper: {
    flex: 1,
    marginHorizontal: 8,
  },
// Stili aggiornati per il Modal
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000, // Assicura che sia sopra tutti gli altri elementi
},
modalContent: {
  width: '90%',
  maxHeight: '80%',
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 20,
  alignSelf: 'center',
  // shadow per iOS
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  // shadow per Android
  elevation: 5,
},
modalHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 15,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
  paddingBottom: 10,
},
modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: Colors.TextColorOnWhite || '#000',
},
closeButton: {
  padding: 5,
},
resourceOption: {
  marginVertical: 8,
},
resourceList: {
  width: '100%',
},

});
