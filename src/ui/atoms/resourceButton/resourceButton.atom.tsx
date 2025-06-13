import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { styles } from "./resourceButton.styles";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/assets/colors";

interface ResourceButtonProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  onLongPress?:()=>void;
}

const ResourceButton = ({ title, icon, onPress, onLongPress }: ResourceButtonProps) => (
  <TouchableOpacity
    style={styles.button}
    onPress={onPress}
    onLongPress={onLongPress} // Aggiunto
    delayLongPress={300} // Opzionale: tempo in ms per attivare il long press
  >
    <View style={styles.icon}>
      <Ionicons name={icon} size={28} color={Colors.IconColorOnGreen} />
    </View>
    <Text style={styles.buttonText} numberOfLines={2}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default ResourceButton;
