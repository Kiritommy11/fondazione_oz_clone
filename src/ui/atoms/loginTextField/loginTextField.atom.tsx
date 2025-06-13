import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { styles } from './loginTextField.styles';
import { Ionicons } from '@expo/vector-icons';


interface LoginTextFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  editable?: boolean;
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
}

const LoginTextField = ({  
value,
onChangeText,
placeholder,
secureTextEntry = false,
keyboardType = 'default',
editable = true,
iconName,
  iconColor = '#999',
  iconSize = 20,
}: LoginTextFieldProps) => (
  <View style={styles.inputWrapper}>
  <View style={styles.inputRow}>
    {iconName && (
      <Ionicons
        name={iconName}
        size={iconSize}
        color={iconColor}
        style={styles.icon}
      />
    )}
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      placeholderTextColor="#999"
      editable={editable}
    />
  </View>
</View>
);

export default LoginTextField;