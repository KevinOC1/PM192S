import React, { useState, useEffect } from 'react';
import {View,Text,TextInput,Button,Alert,StyleSheet,Switch,ImageBackground,SafeAreaView,} from 'react-native';

const FondoBienvenida = () => {
  return (
    <ImageBackground source={require('./assets/logo.png')} style={styles.FondoBienvenida}>
      <Text style={styles.tituloSplash}>Bienvenido a my App!!!!</Text>
    </ImageBackground>
  );
};

export default function App() {
  const [mostrarSplash, setMostrarSplash] = useState(true);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [aceptarTerminos, setAceptarTerminos] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMostrarSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const registrar = () => {
    if (nombre.trim() === '' || correo.trim() === '') {
      Alert.alert('Error', 'llena los campos');
      return;
    }
    if (!aceptarTerminos) {
      Alert.alert('Error', 'acepta los terminos >_<');
      return;
    }l

    Alert.alert('Registro Exitoso', `Nombre: ${nombre}\nCorreo: ${correo}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {mostrarSplash ? (
        <FondoBienvenida />
      ) : (
        <ImageBackground source={require('./assets/fondo.jpg')} style={styles.fondo}>
          <View style={styles.formWrapper}>
            <View style={styles.form}>
              <Text style={styles.Titulo}>Nombre: </Text>
              <TextInput
                style={styles.formilario}
                placeholder="Nombre"
                onChangeText={setNombre}
                value={nombre}
                placeholderTextColor="#aaa"
              />

              <Text style={styles.Titulo}>Correo: </Text>
              <TextInput
                style={styles.formilario}
                placeholder="Correo"
                onChangeText={setCorreo}
                value={correo}
                keyboardType="email-address"
                placeholderTextColor="#aaa"
              />

              <View style={styles.switchContainer}>
                <Text style={styles.label}>Términos y condiciones</Text>
                <Switch
                  value={aceptarTerminos}
                  onValueChange={setAceptarTerminos}
                />
              </View>

              <Button title="Registrar" onPress={registrar} />
            </View>
          </View>
        </ImageBackground>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  fondo: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formWrapper: {
    width: '85%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  FondoBienvenida: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tituloSplash: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  Titulo: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  formilario: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    color: '#000',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
});
