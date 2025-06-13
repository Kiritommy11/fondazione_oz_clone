import { Colors } from '@/assets/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BackgroundWhite, 
    paddingHorizontal: 16,
  },
  buttonList: {
    paddingVertical: 0,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  buttonWrapper: {
    flexBasis: '48%',
    marginHorizontal: '1%',
      marginBottom: 8,
      
  },
  headerImageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  headerImage: {
    height: 40,
    aspectRatio: 5240 / 4027,
    tintColor: Colors.BackgroundWhite,
    resizeMode: 'contain',
  },
  headerButton: {
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    
  },

 editOverlay: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 4,
  marginTop:4,
  marginHorizontal: 4,
  backgroundColor: '#f2f2f2',
  borderRadius: 8,
  padding: 4,
},

});
