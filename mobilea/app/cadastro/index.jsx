import React from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { router } from "expo-router";

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
        <View style={styles.container}>
            <Text style={styles.title}>Preencha seus dados</Text>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        color: '#1DB954',
        marginBottom: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: '#000',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        borderColor: '#B3B3B3',
        borderWidth: 1,
        borderRadius: 12,
        padding: 15,
        marginTop: 15,
        backgroundColor: '#1E1E1E',
        color: '#FFFFFF',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#1DB954',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 40,
        marginTop: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default Cadastro;
