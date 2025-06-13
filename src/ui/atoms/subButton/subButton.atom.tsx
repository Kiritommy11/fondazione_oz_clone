import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "@/assets/colors";
import { styles } from "./subButton.styles";

interface SubButtonProps {
    id: string;
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

const SubButton = ({ title, iconName, onPress }: SubButtonProps) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    {/* Icona */}
    <View style={styles.icon}>
      <Ionicons name={iconName} size={36} color={Colors.IconColorOnWhite} />
    </View>
    {/* Testo */}
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);


export default SubButton;
