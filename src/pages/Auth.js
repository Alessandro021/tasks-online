import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity , ImageBackground, StatusBar, Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons'

import imageBackground from "../../assets/imgs/login.jpg"
import utils from "../utils"
import { api } from "../services";
import axios from "axios";
// import AuthInput from "../components/AuthInput";

export default function Auth(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [stageNew, setStageNew] = useState(false)

    const navigation = useNavigation()

    function signinOrSignup(){
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(stageNew){
            if(name.length < 2 || name.length > 32){
                Alert.alert("Nome inválido", "O nome deve ter entre 2 e 32 caracteres.")
                return
            }
            
            if(!emailRegex.test(email)){
                Alert.alert("Email Invalido", "insira um endereço de e-mail válido")
                return
            }

            if((password !== confirmPassword)){
                Alert.alert("Senhas diferentes", "Senhas digitas são diferentes")
                return
            }
            
            if(password.length < 6){
                Alert.alert("Senhas fraca", "Senhas digitas deve ter mais que 6 caracteres")
                return
            }
            

            signup()
            
        } else {

            if(!emailRegex.test(email)){
                Alert.alert("Email Invalido", "insira um endereço de e-mail válido")
                return
            }
            
            if(password.length < 6){
                Alert.alert("Senhas fraca", "Senhas digitas deve ter mais que 6 caracteres")
                return
            }

            signin()
        }
    }

    async function signup(){
        try {

            await api.post("/signup", {
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            })

            Alert.alert("Parabens","Usuario cadastrado com sucesso.")

            setStageNew(false)
            setName("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
            
        } catch (error) {
            Alert.alert("Ops", `ERROR: ${error}`)
        }
    }

    async function signin(){
        try {
            const response = await api.post("/signin", {
                email: email,
                password: password
            })

            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`
            navigation.navigate("TaskList")
            setName("")
            setEmail("")

        } catch (error) {
            Alert.alert("Ops", `ERROR: ${error}`)
            
        }
    }

    return (
        <ImageBackground source={imageBackground} style={styles.background} >
        <StatusBar barStyle="light-content" backgroundColor="#000"/>

            <Text style={styles.title}>Tasks</Text>

            <View style={styles.formContainer}>

                <Text style={styles.subTitle}>{stageNew ? "Crie sua conta" : "Informe seus dados"}</Text>

                {stageNew &&(
                    <View style={styles.containerInput}>
                        <View style={styles.viewIcon}>
                            <FontAwesome name="user" size={20} color="#333" style={styles.icon} />
                        </View>
                        <TextInput style={styles.input}
                        placeholder= "Nome..."
                        placeholderTextColor="#000"
                        keyboardType='default'
                        value={name}
                        onChangeText={text => setName(text)}
                        />
                    </View>

                )}
                <View style={styles.containerInput}>
                    <View style={styles.viewIcon}>
                        <FontAwesome name="at" size={20} color="#333" />
                    </View>
                    <TextInput icon="at" style={styles.input}
                    placeholder= "E-mail..."
                    placeholderTextColor="#000"
                    autoCapitalize='none'
                    keyboardType='email-address'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    />
                </View>
                
                <View style={styles.containerInput}>
                    <View style={styles.viewIcon}>
                        <FontAwesome name="lock" size={20} color="#333" style={styles.icon} />
                    </View>
                    <TextInput style={styles.input}
                    placeholder= "Senha..."
                    placeholderTextColor="#000"
                    autoCapitalize='none'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    />
                </View>

                {stageNew && (
                    <View style={styles.containerInput}>
                        <View style={styles.viewIcon}>
                            <FontAwesome name="asterisk" size={20} color="#333" style={styles.icon} />
                        </View>
                        <TextInput style={styles.input}
                        placeholder= "Confirme Sua Senha..."
                        placeholderTextColor="#000"
                        autoCapitalize='none'
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={text => setConfirmPassword(text)}
                        />
                    </View>
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
        borderRadius: 10,
    },

    containerInput: {
        width: "100%",
        height: 45,
        backgroundColor: "#EEE",
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    
    viewIcon: {
        width: "12%",
        height: 45,
        justifyContent: "center",
        alignItems: "center",
    },

    input: {
        width: "88%",
        borderRadius: 20,
        height: 45,
        backgroundColor: "#EEE",
        paddingRight: 10,
        paddingLeft: 2,
    },

    buttonView :{
        marginTop: 20,
        backgroundColor: "#080",
        height: 50,
        borderRadius: 10,
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