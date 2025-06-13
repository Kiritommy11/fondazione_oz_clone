import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/colors";

export const styles = StyleSheet.create({
    button: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.Background,
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
        marginBottom: 10,
        height: 120,
    },
    buttonText: {
        color: Colors.TextColorOnGreen,
        fontSize: 16,
        textAlign: "center",
    },
    icon: {
        marginBottom: 8,
        alignContent: "center",
        justifyContent: "center",
    },
    
});
