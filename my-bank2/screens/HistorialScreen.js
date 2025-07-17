import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function HistorialScreen({ navigation, historialVentas }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Ventas</Text>

      <ScrollView style={styles.scroll}>
        {historialVentas.length === 0 ? (
          <Text style={styles.sinVentas}>No hay ventas registradas.</Text>
        ) : (
          historialVentas.map((venta) => (
            <View key={venta.id} style={styles.card}>
              <Text style={styles.fecha}>{venta.fecha}</Text>
              <Text style={styles.metodo}>Método: {venta.metodo}</Text>
              <Text style={styles.total}>Total: ${venta.total}</Text>
              <Text style={styles.productos}>Productos:</Text>
              {venta.productos.map((p, i) => (
                <Text key={i}>• {p.nombre} - ${p.precio}</Text>
              ))}
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnVolver}>
        <Text style={styles.btnText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  scroll: { flex: 1 },
  card: { backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 8 },
  fecha: { fontWeight: 'bold' },
  metodo: { marginTop: 5 },
  total: { marginBottom: 5 },
  productos: { marginTop: 5, fontWeight: 'bold' },
  sinVentas: { fontStyle: 'italic' },
  btnVolver: { backgroundColor: '#6200ee', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 15 },
  btnText: { color: '#fff', fontSize: 16 },
});
