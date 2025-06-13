import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    button: {
        flexDirection: "row",  // Cambia la direzione della flexbox in colonna
        alignItems: "center",  // Allinea gli oggetti (icona e testo) orizzontalmente al centro
        backgroundColor: "#ffffff",
        padding: 16,
        borderRadius: 8,
        justifyContent: 'flex-start',  // Allinea gli oggetti (icona e testo) a sinistra
    },
    buttonText: {
        color: "#000000",
        fontSize: 20,
        marginLeft: 8,
        textAlign: "center",
        flexShrink: 1, // ⬅️ Permette al testo di andare a capo invece di traboccare
    flexWrap: "wrap", // ⬅️ Permette l’andare a capo
    },
    icon: {
        marginBottom: 0,  // Rimuovi il margine inferiore
        alignItems: "center",  // Centra l'icona orizzontalmente
        justifyContent: "center",  // Centra l'icona verticalmente
        
    },
});
