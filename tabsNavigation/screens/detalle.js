import { View, Text, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Detalle({ navigation }) {
  return (
    <View style={styles.container}>
      <Ionicons name="information-circle-outline" size={40} color="#007BFF" />
      <Text style={styles.title}>Detalles del Usuario</Text>

      <Pressable
        style={[styles.button, { backgroundColor: '#28A745' }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Volver a Perfil</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#007BFF',
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
