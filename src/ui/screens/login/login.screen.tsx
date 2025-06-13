import React, {  useState } from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import { styles } from './login.styles'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList } from '../../navigation/types';
import LoginButton from '../../atoms/loginButton/loginButton.atom';
import LoginTextField from '../../atoms/loginTextField/loginTextField.atom';
import * as WebBrowser from "expo-web-browser";
import { signInWithEmailAndPassword} from "firebase/auth";
import {auth} from '../../../firebase/firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Login>; 
}

const LoginScreen = ({ navigation }: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

const handleLogin = () => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    alert("Credenziali errate");
  });
};



    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../../assets/icon.png')}
            style={styles.logo}
          />
        </View>
     
        <View style={styles.formContainer}>
          <Text style={styles.title}>Accedi</Text>
     
          <LoginTextField
            placeholder="Email o Username"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            editable={!isSubmitting}
          iconName="mail"
          />
          <LoginTextField
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!isSubmitting}
            iconName="lock-closed"
          />
     
          <LoginButton 
            onPress={handleLogin} 
            disabled={isSubmitting}
            text={isSubmitting ? "Accesso in corso..." : "Accedi"}
          />
          
          
        
        </View>
      </View>
    </SafeAreaView>
  );
};
export default LoginScreen;
