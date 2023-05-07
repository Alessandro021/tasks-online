import { View, Text, StyleSheet } from "react-native";

export default function Auth(){
    return (
        <View style={styles.container}>
            <Text>Auth</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})