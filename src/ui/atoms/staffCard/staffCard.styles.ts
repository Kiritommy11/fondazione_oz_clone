import { Colors } from '@/assets/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.BackgroundWhite,
    elevation: 3,
    marginVertical: 8,
    marginHorizontal: 12,
    minHeight: 90, // più compatto
  },
  imageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  logoWrapper: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BackgroundWhite,
    borderRadius: 12,
    opacity: 0.9,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  profileRole: {
    fontSize: 14,
    color: Colors.TextColorGray,
    marginTop: 4,
  },
  presenceDot: {
    width: 20,
    height: 20,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.BackgroundWhite,
  },
});
