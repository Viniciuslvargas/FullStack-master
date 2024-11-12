import React from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';

const Cadastro = () => {
    const [nome, setNome] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [senha, setSenha] = React.useState("");
    const [sobrenome, setSobrenome] = React.useState("");
    const [telefone, setTelefone] = React.useState("");

    const enviarCadastro = async () => {
        if (!nome || !senha || !email || !sobrenome || !telefone) {
            alert("Preencha todos os campos corretamente");
            return;
        }
        try {
            const resposta = await fetch('http://localhost:8000/autenticacao/registro', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome,
                    sobrenome,
                    email,
                    senha,
                    telefone,
                }),
            });

            if (resposta.status === 200) {
                alert("Usuário criado com sucesso");
                router.replace('../home');
            } else if (resposta.status === 409) {
                alert("Email já cadastrado");
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <LinearGradient
            colors={['#003366', '#1D2D44']} 
            style={styles.container}
        >
            <Text style={styles.title}>BeatHub</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={setNome}
                    value={nome}
                    placeholder="Escreva seu nome"
                    placeholderTextColor="#B3B3B3"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setSobrenome}
                    value={sobrenome}
                    placeholder="Escreva seu sobrenome"
                    placeholderTextColor="#B3B3B3"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Escreva seu email"
                    placeholderTextColor="#B3B3B3"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setSenha}
                    value={senha}
                    placeholder="Escreva sua senha"
                    placeholderTextColor="#B3B3B3"
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setTelefone}
                    value={telefone}
                    placeholder="Escreva seu telefone"
                    placeholderTextColor="#B3B3B3"
                />
            </View>
            <Pressable style={styles.button} onPress={enviarCadastro}>
                <Text style={styles.buttonText}>Enviar Registro</Text>
            </Pressable>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        backgroundColor: 'transparent',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        backgroundImage: 'linear-gradient(to right, #4D98FF, #00B8FF)', 
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        borderColor: '#4D98FF', 
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginTop: 15,
        backgroundColor: '#FFFFFF', 
        color: '#003366', 
    },
    button: {
        backgroundColor: '#4D98FF', 
        borderRadius: 50,
        paddingVertical: 12,
        paddingHorizontal: 30,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Cadastro;
