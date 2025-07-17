import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function LoginScreen({ login }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const success = login(username, password);
    if (!success) {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput placeholder="Usuario" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, justifyContent: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginBottom: 10 },
  button: { backgroundColor: '#6200ee', padding: 10, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
