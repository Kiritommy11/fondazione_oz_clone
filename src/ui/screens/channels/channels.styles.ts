import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // sfondo bianco pulito
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#555555',
    marginBottom: 12,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  centeredText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    marginTop: 20,
  },
   inputContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    color: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  messageBox: {
    padding: 12,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    marginBottom: 10,
  },
  senderText: {
    fontWeight: 'bold',
    color: '#aaa',
    marginBottom: 4,
  },
  
channelCard: {
  backgroundColor: '#f0f0f0',
  padding: 16,
  borderRadius: 10,
  marginBottom: 12,
  elevation: 2,
},
channelName: {
  fontSize: 18,
  fontWeight: '500',
  color: '#222',
},
 headerButton: {
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
