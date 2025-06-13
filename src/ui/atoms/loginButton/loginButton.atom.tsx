import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./loginButton.styles";

interface loginButtonProps {
  onPress: () => void;
  disabled?: boolean;
  text?:string;
}

const LoginButton = ({  onPress, disabled,text }: loginButtonProps) => (
  <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
    <Text style={styles.buttonText}>{text}</Text>

  </TouchableOpacity>
);


export default LoginButton;
