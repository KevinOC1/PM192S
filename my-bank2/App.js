/* Zona 1: Importaciones */
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';


/* Zona 2: Main(ejecutacion) */
export default function App() {
  const [nombre, setNombre] = useState('');

  const mostrarAlerta = () => {
    if (nombre.trim() === '') {
      Alert.alert('Error', 'Por favor escribe algo');
      alert('Escribe algo jilipollas');
    } else {
      Alert.alert('Bienvenida', `Hola ${nombre}, bienvenido a nuestra app :D`);
      alert('Hola ' + nombre + ' bienvenid@ a nuestra app :D');

    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ingresa tu nombre:</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe tu nombre :"
        onChangeText={setNombre}
        value={nombre}
      />

      <Button title="Enviar" onPress={mostrarAlerta} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white', 
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000', 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc', 
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#f9f9f9', // Color de fondo del input
    color: '#000', // Texto del input en negro
  },
});