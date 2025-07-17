import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function VentasScreen({ navigation, productos, setProductos, carrito, setCarrito, logout }) {
  const [modalPagoVisible, setModalPagoVisible] = useState(false);
  const [metodoPago, setMetodoPago] = useState('efectivo');

  const agregarAlCarrito = (producto) => {
    if (producto.stock <= 0) return;
    setCarrito([...carrito, { ...producto }]);
    setProductos(productos.map(p => p.id === producto.id ? { ...p, stock: p.stock - 1 } : p));
  };

  const quitarDelCarrito = (index, productoId) => {
    setCarrito(carrito.filter((_, i) => i !== index));
    setProductos(productos.map(p => p.id === productoId ? { ...p, stock: p.stock + 1 } : p));
  };

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  const confirmarPago = () => {
    if (carrito.length === 0) {
      Alert.alert('Carrito vacío', 'Agrega productos antes de pagar');
      return;
    }
    Alert.alert('Venta realizada', `Método: ${metodoPago}\nTotal: $${total}`);
    setCarrito([]);
    setModalPagoVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuRow}>
        <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.navigate('Almacén')}>
          <Text style={styles.menuText}>Ir a Almacén</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuBtn, { backgroundColor: '#E53935' }]} onPress={logout}>
          <Text style={styles.menuText}>Salir</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list}>
        {productos.map(p => (
          <View key={p.id} style={styles.card}>
            <Text style={styles.cardTitle}>{p.nombre} (${p.precio})</Text>
            <Text>{p.descripcion}</Text>
            <Text>Stock: {p.stock}</Text>
            <TouchableOpacity style={styles.smallButton} onPress={() => agregarAlCarrito(p)}>
              <Text style={styles.smallButtonText}>Agregar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.title}>Carrito</Text>
      <ScrollView style={styles.list}>
        {carrito.map((item, i) => (
          <TouchableOpacity key={i} onLongPress={() => quitarDelCarrito(i, item.id)} style={styles.cartItem}>
            <Text>{item.nombre} - ${item.precio}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text>Total: ${total}</Text>
      <TouchableOpacity style={styles.button} onPress={() => setModalPagoVisible(true)}>
        <Text style={styles.buttonText}>Pagar</Text>
      </TouchableOpacity>

      <Modal visible={modalPagoVisible} animationType="slide">
        <View style={styles.container}>
          <Text style={styles.title}>Método de Pago</Text>
          <Picker selectedValue={metodoPago} onValueChange={setMetodoPago} style={{ width: '100%' }}>
            <Picker.Item label="Efectivo" value="efectivo" />
            <Picker.Item label="Tarjeta" value="tarjeta" />
            <Picker.Item label="Transferencia" value="transferencia" />
          </Picker>
          <Text style={{ marginTop: 10 }}>Total: ${total}</Text>
          <TouchableOpacity style={styles.button} onPress={confirmarPago}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#999' }]} onPress={() => setModalPagoVisible(false)}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f5f5f5' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  button: { backgroundColor: '#6200ee', padding: 10, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  menuRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  menuBtn: { backgroundColor: '#6200ee', padding: 10, borderRadius: 8 },
  menuText: { color: '#fff' },
  list: { marginBottom: 10 },
  card: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginBottom: 5 },
  smallButton: { backgroundColor: '#4CAF50', padding: 5, borderRadius: 5, marginTop: 5, alignItems: 'center' },
  smallButtonText: { color: '#fff', fontSize: 12 },
  cartItem: { backgroundColor: '#eee', padding: 8, borderRadius: 8, marginBottom: 3 },
});
