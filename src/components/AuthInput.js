
import { View, Text, TextInput, StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons'

export default function AuthInput({...rest}){
    
    return (
        <View style={[styles.container, rest.style]}>
            <FontAwesome name={rest.icon} size={20} color="#333" style={styles.icon} />
            <TextInput {...rest} style={styles.input} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 40,
        backgroundColor: "#EEE",
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
    }, 
    icon: {
        marginLeft: 20,
    },

    input: {
        marginLeft: 20,
        width: "70%",
    },
})