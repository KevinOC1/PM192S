/* Zona 1 importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import React,{useState} from 'react';

const Texto=({style})=>{

  const[contenido,setContenido]=useState('Hola Kevin React')
  const actualizarTexto=()=>{setContenido('Estado Actualizado')
  }
  return(<Text style={[styles.Text,style]} onPress={actualizarTexto}>{contenido}</Text>)
}

/* Zona 2 Main */
export default function App() {
  return (
    <View style={styles.container}>
      <Texto  style={styles.red}> </Texto>
      <Texto  style={styles.blue} ></Texto>
      <Texto  style={styles.green}></Texto>
      <StatusBar style="auto" />
    </View>
  );
}
/*  zona 3 estilos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'base-line',
    justifyContent: 'center',
    flexDirection:"column",
  },
  Text:{
    color:'purple',
    fontSize:25,
   
    
  },
  red: {  backgroundColor: 'red'},
  green: { backgroundColor: 'green'},
  blue: { backgroundColor: 'blue'},

});