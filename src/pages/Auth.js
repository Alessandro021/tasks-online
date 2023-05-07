import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity , ImageBackground, StatusBar, Alert} from "react-native";

import imageBackground from "../../assets/imgs/login.jpg"
import utils from "../utils"

export default function Auth(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [stageNew, setStageNew] = useState(false)

    function signinOrSignup(){
        if(stageNew){
            Alert.alert("Cadstrar")
        } else {
            Alert.alert("Entrar")
        }
    }

    return (
        <ImageBackground source={imageBackground} style={styles.background} >
        <StatusBar barStyle="light-content" backgroundColor="#000"/>

            <Text style={styles.title}>Tasks</Text>

            <View style={styles.formContainer}>

                <Text style={styles.subTitle}>{stageNew ? "Crie sua conta" : "Informe seus dados"}</Text>

                {stageNew &&(
                    <TextInput style={styles.input}
                    placeholder= "Seu Nome..."
                    placeholderTextColor="#000"
                    keyboardType='default'
                    value={name}
                    onChangeText={text => setName(text)}
                    />
                )}

                <TextInput style={styles.input}
                placeholder= "Seu E-mail..."
                placeholderTextColor="#000"
                autoCapitalize='none'
                keyboardType='email-address'
                value={email}
                onChangeText={text => setEmail(text)}
                />

                <TextInput style={styles.input}
                placeholder= "Sua Senha..."
                placeholderTextColor="#000"
                autoCapitalize='none'
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
                />

                {stageNew && (
                    <TextInput style={styles.input}
                    placeholder= "Confirme Sua Senha..."
                    placeholderTextColor="#000"
                    autoCapitalize='none'
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                    />
                )}

                <View style={styles.buttonView}>
                    <TouchableOpacity onPress={signinOrSignup} style={styles.button}>
                        <Text style={styles.buttonText}>{stageNew ? "Cadastrar" : "Entrar"}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={{padding: 10}} onPress={() => setStageNew(!stageNew)}> 
                    <Text style={styles.buttonText}>
                        {stageNew ? "Já tem uma conta? Entre aqui" : "Não tem uma conta? Cadastre-se aqui"}
                    </Text>
                </TouchableOpacity>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        fontFamily: utils.fontFamily,
        color: utils.colors.secundario,
        fontSize: 70,
        fontWeight: "700",
        marginBottom: 10,
    },

    subTitle: {
        fontFamily: utils.fontFamily,
        color: "#FFF",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10,
        fontWeight: "500"
    },

    formContainer: {
        backgroundColor: "rgba(0,0,0,0.8)",
        padding: 20,
        width: "90%",
    },

    input: {
        marginTop: 10,
        height: 40,
        backgroundColor: "#FFF",
        padding: 10,
    },

    buttonView :{
        marginTop: 20,
        backgroundColor: "#080",
        height: 50,
    },

    button: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    buttonText: {
        fontFamily: utils.fontFamily,
        color: "#FFF",
        fontSize: 20,
        fontWeight: "700",
    },
})