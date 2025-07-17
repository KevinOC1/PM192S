import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Home() {
  return (
    <View style={styles.container}>
      <Ionicons name="home-outline" size={28} color="red" />
      <Text style={styles.title}>Bienvenido a la pantalla principal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'red',
  },
});
