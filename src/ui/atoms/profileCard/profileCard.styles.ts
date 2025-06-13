import { Colors } from '@/assets/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20,
    borderRadius: 16,
    backgroundColor: Colors.BackgroundWhite,
    elevation: 4,
    margin: 12,
    minHeight: 180,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 30,
  },
  logoWrapper: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BackgroundWhite,
    borderRadius: 20,
    opacity: 0.8,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  presenceDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: Colors.BackgroundWhite,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 16,
    color: Colors.TextColorGray,
    marginBottom: 8,
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.BackgroundGray,
    borderRadius: 8,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
