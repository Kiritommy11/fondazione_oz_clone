import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./placeholderButton.styles";
import { Colors } from "@/assets/colors";

interface PlaceholderButtonProps {
  onPress: () => void;
}

const PlaceholderButton = ({ onPress }: PlaceholderButtonProps) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <View style={styles.icon}>
      <Ionicons name="add" size={28} color={Colors.IconColorOnWhite} />
    </View>
    <Text style={styles.text}>Aggiungi</Text>
  </TouchableOpacity>
);

export default PlaceholderButton;
