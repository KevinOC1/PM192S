// Zona 1: Importaciones
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Switch, ImageBackground } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

// Zona 2: Componente Principal
export default function App() {
  const [activarSwitch, setActivarSwitch] = useState(false);
  const [modoOscuro, setModoOscuro] = useState(false);

  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require('./assets/fondo.jpg')} // 🔁 Cambia esto si tu imagen está en otro lugar
        style={styles.fondoImagen}
        resizeMode="cover"
      >
        <View style={[styles.contenedor, modoOscuro && styles.fondoOscuro]}>
          <SafeAreaView style={{ flex: 1 }}>
            <Text style={[styles.titulo, modoOscuro && styles.textoClaro]}>
              Práctica con Switch
            </Text>

            <View style={styles.opcion}>
              <Text style={[styles.etiqueta, modoOscuro && styles.textoClaro]}>
                Activar Switch 2
              </Text>
              <Switch
                value={activarSwitch}
                onValueChange={setActivarSwitch}
                trackColor={{ false: '#ccc', true: '#4caf50' }}
                thumbColor={activarSwitch ? '#ffffff' : '#999999'}
              />
            </View>

            <View style={styles.opcion}>
              <Text style={[styles.etiqueta, modoOscuro && styles.textoClaro]}>
                Modo Oscuro
              </Text>
              <Switch
                value={modoOscuro}
                onValueChange={setModoOscuro}
                disabled={activarSwitch}
                trackColor={
                  activarSwitch
                    ? { false: '#ffbbbb', true: '#ff3b30' }
                    : { false: '#ccc', true: '#4caf50' }
                }
                thumbColor={modoOscuro ? '#ffffff' : '#999999'}
              />
            </View>

            <StatusBar style={modoOscuro ? 'light' : 'dark'} />
          </SafeAreaView>
        </View>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

// Zona 3: Estilos
const styles = StyleSheet.create({
  fondoImagen: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contenedor: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)', // ✅ Fondo semitransparente por encima de la imagen
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  fondoOscuro: {
    backgroundColor: 'rgba(0,0,0,0.6)', // Fondo semitransparente en modo oscuro
  },
  titulo: {
    fontSize: 24,
    marginBottom: 40,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textoClaro: {
    color: '#ffffff',
  },
  opcion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    alignItems: 'center',
  },
  etiqueta: {
    fontSize: 18,
  },
});
