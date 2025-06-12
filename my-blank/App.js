//Zona 1, donde van todas las imopportaciones
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useState} from 'react';


const Texto=()=>{
  const [contenido, setContenido]=useState('hola munndo React')
  const actualizarTexto=()=>{setContenido('Estado Actualizado')}
  return(
      <Text onPress={actualizarTexto}> {contenido} </Text>
  )
}

//Zona2, Main
export default function App() {
  return (
    <View style={styles.container}>
      <Texto></Texto>
      <Texto></Texto>
      <Texto></Texto>

      <Button title="Presioname"> </Button>
      <StatusBar style="auto" />
    </View>
  );
}

//Zona 3, Estilos 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
