import { StyleSheet } from "react-native";
import { Colors } from "@/assets/colors";

export const styles = StyleSheet.create({
  button: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: Colors.Background,
    backgroundColor: "transparent",
    padding: 10,
        borderRadius: 8,
        marginVertical: 5,
        marginBottom: 10,
        height: 120,
  },
  icon: {
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
    
  },
  text: {
    color: Colors.TextColorOnWhite,
    fontSize: 16,
    textAlign: "center",
  },
});
