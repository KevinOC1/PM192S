import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSwitchBlocked, setIsSwitchBlocked] = useState(true);
  const [disabledButton, setDisabledButton] = useState(false);
  const [count, setCount] = useState(0);

  const toggleDarkMode = () => setIsDarkMode(previous => !previous);

  const handleFirstButton = () => Alert.alert('Me presionaste');
  const handleDisableButton = () => setDisabledButton(true);
  const handleCounter = () => setCount(count + 1);
  const handlePokeball = () => Alert.alert('¡La pokebola ha sido presionada!');

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkBackground]}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>Práctica Switch</Text>

      {/* Switch principal para modo oscuro */}
      <View style={styles.switchContainer}>
        <Text style={isDarkMode ? styles.darkText : styles.lightText}>Modo Oscuro</Text>
        <Switch
          value={isDarkMode}
          onValueChange={isSwitchBlocked ? null : toggleDarkMode}
        />
      </View>

      {/* Switch que bloquea el cambio */}
      <View style={styles.switchContainer}>
        <Text style={isDarkMode ? styles.darkText : styles.lightText}>Bloquear Switch</Text>
        <Switch
          value={isSwitchBlocked}
          onValueChange={() => setIsSwitchBlocked(!isSwitchBlocked)}
        />
      </View>

      {/* Botón 1 - alerta */}
      <TouchableOpacity style={styles.button} onPress={handleFirstButton}>
        <Text style={styles.buttonText}>Primer Botón</Text>
      </TouchableOpacity>

      {/* Botón 2 - desactiva después de presionar */}
      <TouchableOpacity
        style={[styles.button, disabledButton && styles.buttonDisabled]}
        onPress={handleDisableButton}
        disabled={disabledButton}
      >
        <Text style={styles.buttonText}>
          {disabledButton ? 'Desactivado' : 'Segundo Botón'}
        </Text>
      </TouchableOpacity>

      {/* Botón 3 - contador */}
      <TouchableOpacity style={styles.button} onPress={handleCounter}>
        <Text style={styles.buttonText}>Tercer Botón (Contador: {count})</Text>
      </TouchableOpacity>

      {/* Botón 4 - pokebola */}
      <TouchableOpacity onPress={handlePokeball}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Poké_Ball_icon.svg' }}
          style={styles.pokeball}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  darkBackground: {
    backgroundColor: '#222',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 12,
    marginTop: 10,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#95a5a6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  pokeball: {
    width: 60,
    height: 60,
    marginTop: 20,
  },
});
