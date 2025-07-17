import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Settings() {
  return (
    <View style={styles.container}>
      <Ionicons name="settings-outline" size={28} color="blue" />
      <Text style={styles.title}>Configuraciones de usuario</Text>
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
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    color: 'blue',
  },
});
