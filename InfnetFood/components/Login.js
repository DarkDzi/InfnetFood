import { Text, SafeAreaView, StyleSheet, View, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');
  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  const navigation = useNavigation();

  const urlAPI = 'https://dummyjson.com/user/login';

  const handleLogin = async () => {
    try {
      const response = await fetch(urlAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'emilys',
          password: 'emilyspass',
          expiresInMins: 30,
        }),
      });
      const data = await response.json();

      if (email.trim() === '' || senha.trim() === '') {
        setMessage('Preencha os campos');
      } else {
        if (emailRegex.test(email) === false) {
          setMessage('Coloque um Email válido');
        } else {
          if (response.ok) {
            setMessage('Login com sucesso!');
            navigation.navigate('Tabs', { email });
          } else {
            setMessage('Login incorreto');
          }
        }
      }
    } catch (error) {
      setMessage('Não conectou com a API');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Bem-vindo!</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true}
        />

        <View style={styles.buttonContainer}>
          <Button onPress={handleLogin} title="Entrar" color="black" />
        </View>

        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: '#007bff',
    borderRadius: 10,
  },
  message: {
    marginTop: 20,
    color: '#e74c3c',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Login;
